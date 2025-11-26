import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SalesNoteStateService } from '../../services/sales-note-state.service';
import { Currency } from '../../models/sales-note.model';

@Component({
  selector: 'app-step-products',
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CurrencyPipe,
    TranslateModule
  ],
  templateUrl: './step-products.html',
  styleUrl: './step-products.scss'
})
export class StepProducts {
  private readonly fb = inject(FormBuilder);
  protected readonly stateService = inject(SalesNoteStateService);

  protected readonly displayedColumns = ['name', 'quantity', 'unitPrice', 'total', 'actions'];
  protected readonly editingProductId = signal<string | null>(null);

  protected readonly currencies: { value: Currency; label: string }[] = [
    { value: 'MXN', label: 'MXN' },
    { value: 'USD', label: 'USD' }
  ];

  protected readonly newProductForm = this.fb.group({
    name: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    unitPrice: [0, [Validators.required, Validators.min(0)]]
  });

  protected readonly editProductForm = this.fb.group({
    name: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    unitPrice: [0, [Validators.required, Validators.min(0)]]
  });

  protected readonly products = this.stateService.products;
  protected readonly currency = this.stateService.currency;
  protected readonly total = this.stateService.total;

  protected addProduct(): void {
    if (this.newProductForm.valid) {
      const value = this.newProductForm.value;
      this.stateService.addProduct({
        name: value.name!,
        quantity: value.quantity!,
        unitPrice: value.unitPrice!
      });
      this.newProductForm.reset({ quantity: 1, unitPrice: 0 });
    }
  }

  protected removeProduct(id: string): void {
    this.stateService.removeProduct(id);
    if (this.editingProductId() === id) {
      this.editingProductId.set(null);
    }
  }

  protected startEdit(product: any): void {
    this.editingProductId.set(product.id);
    this.editProductForm.patchValue({
      name: product.name,
      quantity: product.quantity,
      unitPrice: product.unitPrice
    });
  }

  protected saveEdit(productId: string): void {
    if (this.editProductForm.valid) {
      const value = this.editProductForm.value;
      this.stateService.updateProduct(productId, {
        name: value.name!,
        quantity: value.quantity!,
        unitPrice: value.unitPrice!
      });
      this.editingProductId.set(null);
    }
  }

  protected cancelEdit(): void {
    this.editingProductId.set(null);
  }

  protected changeCurrency(currency: Currency): void {
    this.stateService.updateCurrency(currency);
  }
}
