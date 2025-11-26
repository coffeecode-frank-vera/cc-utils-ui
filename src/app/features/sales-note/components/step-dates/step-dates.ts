import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import { SalesNoteStateService } from '../../services/sales-note-state.service';

@Component({
  selector: 'app-step-dates',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule
  ],
  templateUrl: './step-dates.html',
  styleUrl: './step-dates.scss'
})
export class StepDates implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly stateService = inject(SalesNoteStateService);

  protected readonly form: FormGroup = this.fb.group({
    creationDate: [new Date(), Validators.required],
    deliveryDate: [new Date(), Validators.required]
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      if (this.form.valid) {
        this.stateService.updateDates(value);
      }
    });

    const currentDates = this.stateService.dates();
    this.form.patchValue(currentDates, { emitEvent: false });
  }
}
