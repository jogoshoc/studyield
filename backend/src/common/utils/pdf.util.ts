import { PDFParse } from 'pdf-parse';

/**
 * Extract text from a PDF buffer using pdf-parse v2.
 * Concatenates page texts (without the "— n of m —" footer that
 * pdf-parse appends to the combined text).
 */
export async function extractPdfText(fileBuffer: Buffer): Promise<string> {
  const parse = new PDFParse({ data: fileBuffer });
  const result = await parse.getText();

  const pages = result.pages || [];
  if (pages.length > 0) {
    return pages
      .map((page) => (page.text || '').trim())
      .filter(Boolean)
      .join('\n\n');
  }

  return (result.text || '').trim();
}