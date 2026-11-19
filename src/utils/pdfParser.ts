import * as pdfjsLib from 'pdfjs-dist';
// Import local bundled worker from node_modules so we NEVER depend on slow/blocked external CDNs!
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

export async function parsePdfFile(
  file: File, 
  onProgress?: (msg: string) => void
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  // Enforce a strict timeout so it NEVER hangs indefinitely
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error('PDF extraction timed out after 10 seconds. The file may be password protected or too complex.'));
    }, 10000);
  });

  try {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
      stopAtErrors: false,
    });

    const pdf = await Promise.race([loadingTask.promise, timeoutPromise]);
    let fullText = '';
    const numPages = pdf.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      if (onProgress) {
        onProgress(`Extracting page ${pageNum} of ${numPages}...`);
      }

      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      let lastY: number | null = null;
      let pageText = '';

      for (const item of textContent.items) {
        if ('str' in item && typeof item.str === 'string') {
          const currentY = 'transform' in item ? item.transform[5] : null;
          if (lastY !== null && currentY !== null && Math.abs(currentY - lastY) > 5) {
            pageText += '\n';
          } else if (pageText.length > 0 && !pageText.endsWith(' ') && !pageText.endsWith('\n')) {
            pageText += ' ';
          }
          pageText += item.str;
          lastY = currentY;
        }
      }

      fullText += pageText + '\n\n';
    }

    const trimmed = fullText.trim();
    // If text was extracted, return it
    if (trimmed.length > 30) {
      return trimmed;
    }

    // If PDF has no text layer, it might be a scanned image-only PDF!
    // Try fallback raw stream or render page to canvas for OCR
    if (onProgress) {
      onProgress('Scanned PDF detected. Running OCR image extraction...');
    }
    const ocrText = await extractTextFromScannedPdf(pdf);
    if (ocrText.length > 20) {
      return ocrText;
    }

    // Try raw byte extraction fallback
    const rawFallback = extractTextFromRawPdfBuffer(arrayBuffer);
    if (rawFallback.length > 30) {
      return rawFallback;
    }

    throw new Error('This PDF appears to be empty or contains only non-readable images. Try saving as text or uploading an image screenshot.');
  } catch (error: any) {
    console.warn('Primary PDF parser encountered an error:', error);

    // Final attempt: fallback raw byte extraction
    const rawFallback = extractTextFromRawPdfBuffer(arrayBuffer);
    if (rawFallback.length > 30) {
      return rawFallback;
    }

    throw new Error(error.message || 'Could not parse the PDF file.');
  }
}

/**
 * Fallback raw text extractor from PDF binary stream
 */
function extractTextFromRawPdfBuffer(buffer: ArrayBuffer): string {
  try {
    const bytes = new Uint8Array(buffer);
    let str = '';
    // Sample reasonable chunk of bytes to avoid memory lock
    const limit = Math.min(bytes.length, 1024 * 1024);
    for (let i = 0; i < limit; i++) {
      const code = bytes[i];
      // Keep printable ASCII
      if ((code >= 32 && code <= 126) || code === 10 || code === 13 || code === 9) {
        str += String.fromCharCode(code);
      }
    }

    // Match text blocks inside parenthesis (text) Tj or [(t)(e)(x)(t)] TJ
    const tjMatches = str.match(/\(([^()]{2,100})\)\s*Tj/g) || [];
    const extractedWords: string[] = [];
    for (const match of tjMatches) {
      const cleaned = match.replace(/^\(/, '').replace(/\)\s*Tj$/, '').trim();
      if (cleaned.length > 1 && !cleaned.startsWith('/') && !cleaned.includes('%%')) {
        extractedWords.push(cleaned);
      }
    }

    if (extractedWords.length > 15) {
      return extractedWords.join(' ');
    }
  } catch (e) {
    console.warn('Raw buffer fallback failed:', e);
  }
  return '';
}

/**
 * Render first 2 pages of scanned PDF to canvas and run OCR
 */
async function extractTextFromScannedPdf(pdf: any): Promise<string> {
  try {
    const { createWorker } = await import('tesseract.js');
    const worker = await createWorker('eng');
    let fullOcr = '';

    const maxPages = Math.min(pdf.numPages, 3);
    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) continue;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport,
      }).promise;

      const result = await worker.recognize(canvas);
      fullOcr += result.data.text + '\n\n';
    }

    await worker.terminate();
    return fullOcr.trim();
  } catch (err) {
    console.warn('OCR on scanned PDF failed:', err);
    return '';
  }
}
