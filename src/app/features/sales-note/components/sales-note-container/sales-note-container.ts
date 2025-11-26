import { Component, signal } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SalesNoteStateService } from '../../services/sales-note-state.service';
import { StepDates } from '../step-dates/step-dates';
import { StepCustomer } from '../step-customer/step-customer';
import { StepProducts } from '../step-products/step-products';
import { StepPreview } from '../step-preview/step-preview';

@Component({
  selector: 'app-sales-note-container',
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    TranslateModule,
    StepDates,
    StepCustomer,
    StepProducts,
    StepPreview
  ],
  providers: [SalesNoteStateService],
  templateUrl: './sales-note-container.html',
  styleUrl: './sales-note-container.scss'
})
export class SalesNoteContainer {
  protected readonly isLangVisible = signal(false);
  protected readonly isLinear = signal(true);
  protected readonly currentLang = signal('es');
  protected readonly availableLanguages = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' }
  ];

  constructor(
    protected readonly stateService: SalesNoteStateService,
    private readonly translate: TranslateService
  ) {
    this.translate.use('es');
  }

  protected changeLanguage(langCode: string): void {
    this.translate.use(langCode);
    this.currentLang.set(langCode);
  }
}
