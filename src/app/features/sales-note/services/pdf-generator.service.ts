import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { SalesNote } from '../models/sales-note.model';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  async generatePDF(
    element: HTMLElement,
    filename: string = 'nota-venta.pdf'
  ): Promise<void> {
    try {
      console.log('Starting PDF generation...');
      console.log('Element dimensions:', element.offsetWidth, element.offsetHeight);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      console.log('Canvas created:', canvas.width, canvas.height);

      // Check if canvas is empty
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('El canvas está vacío - el elemento no se renderizó correctamente');
      }

      const imgData = canvas.toDataURL('image/png');
      console.log('Image data length:', imgData.length);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      console.log('Saving PDF:', filename);
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  generateFilename(salesNote: SalesNote): string {
    const date = new Date().toISOString().split('T')[0];
    const customerName = salesNote.customer.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    return `nota-venta-${customerName}-${date}.pdf`;
  }
}
