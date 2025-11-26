import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SalesNoteStateService } from '../../services/sales-note-state.service';
import { BUSINESS_INFO } from '../../config/business-info.config';

@Component({
  selector: 'app-pdf-template',
  imports: [CurrencyPipe, DatePipe, TranslateModule],
  templateUrl: './pdf-template.html',
  styleUrl: './pdf-template.scss'
})
export class PdfTemplate {
  private readonly stateService = inject(SalesNoteStateService);

  protected readonly businessInfo = BUSINESS_INFO;
  protected readonly dates = this.stateService.dates;
  protected readonly customer = this.stateService.customer;
  protected readonly products = this.stateService.products;
  protected readonly total = this.stateService.total;
  protected readonly currency = this.stateService.currency;
  protected readonly today = new Date();
}
