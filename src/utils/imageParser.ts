import { createWorker } from 'tesseract.js';

export async function parseImageFile(
  file: File,
  onProgress?: (progressText: string) => void
): Promise<string> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Image OCR extraction timed out after 20 seconds. Please try a clearer image or paste text.'));
    }, 20000);
  });

  const ocrPromise = (async () => {
    if (onProgress) onProgress('Initializing OCR engine...');

    const worker = await createWorker('eng', 1, {
      logger: (m) => {
        if (onProgress && m.status === 'recognizing text') {
          const pct = Math.round((m.progress || 0) * 100);
          onProgress(`Extracting text from image (${pct}%)...`);
        }
      },
    });

    if (onProgress) onProgress('Reading image text...');
    const result = await worker.recognize(file);
    await worker.terminate();

    const text = result.data.text.trim();
    if (!text || text.length < 15) {
      throw new Error('Could not recognize any legible text in this image. Please ensure the resume image is well-lit and clear.');
    }

    return text;
  })();

  return Promise.race([ocrPromise, timeoutPromise]);
}
