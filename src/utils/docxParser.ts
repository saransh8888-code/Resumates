import mammoth from 'mammoth';

export async function parseDocxFile(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error('Failed to parse DOCX:', error);
    throw new Error('Could not parse the DOCX file. Please make sure it is a valid Word document.');
  }
}
