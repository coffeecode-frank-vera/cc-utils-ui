import { Component, inject, viewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { SalesNoteStateService } from '../../services/sales-note-state.service';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { PdfTemplate } from '../pdf-template/pdf-template';

@Component({
  selector: 'app-step-preview',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    TranslateModule,
    PdfTemplate
  ],
  templateUrl: './step-preview.html',
  styleUrl: './step-preview.scss'
})
export class StepPreview {
  private readonly stateService = inject(SalesNoteStateService);
  private readonly pdfService = inject(PdfGeneratorService);

  protected readonly pdfTemplate = viewChild<ElementRef>('pdfTemplate');
  protected readonly isGenerating = signal(false);

  // Expose state for template
  protected readonly dates = this.stateService.dates;
  protected readonly customer = this.stateService.customer;
  protected readonly products = this.stateService.products;
  protected readonly currency = this.stateService.currency;
  protected readonly total = this.stateService.total;

  protected async downloadPDF(): Promise<void> {
    const element = this.pdfTemplate()?.nativeElement;
    if (!element) {
      console.error('PDF template element not found');
      return;
    }

    this.isGenerating.set(true);

    try {
      // Small delay to ensure the element is rendered
      await new Promise(resolve => setTimeout(resolve, 100));

      const salesNote = this.stateService.getSalesNote();
      const filename = this.pdfService.generateFilename(salesNote);
      await this.pdfService.generatePDF(element, filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor intenta de nuevo.');
    } finally {
      this.isGenerating.set(false);
    }
  }
}
