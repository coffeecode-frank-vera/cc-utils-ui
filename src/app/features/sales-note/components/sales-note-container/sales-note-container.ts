import { Component, signal, ViewChild } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
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
import { StepperSelectionEvent } from '@angular/cdk/stepper';

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
  @ViewChild(MatStepper) stepper!: MatStepper;
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

  onStepChange(event: StepperSelectionEvent) {
    const from = event.previouslySelectedIndex;
    const to = event.selectedIndex;
    
    if (to <= from) return;

    if (!this.isValid(to)) {
      Promise.resolve().then(() => {
        this.stepper.selectedIndex = from;
      });
    }
  }

  isValid(index: number) {
    if (index === 2) return this.stateService.isCustomerValid();
    if (index === 3) return this.stateService.isValid();

    return true;
  }
}
