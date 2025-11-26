import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { SalesNoteStateService } from '../../services/sales-note-state.service';

@Component({
  selector: 'app-step-customer',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, TranslateModule],
  templateUrl: './step-customer.html',
  styleUrl: './step-customer.scss'
})
export class StepCustomer implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly stateService = inject(SalesNoteStateService);

  protected readonly form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: [''],
    email: ['', Validators.email]
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      if (this.form.valid) {
        this.stateService.updateCustomer(value);
      }
    });

    const currentCustomer = this.stateService.customer();
    this.form.patchValue(currentCustomer, { emitEvent: false });
  }
}
