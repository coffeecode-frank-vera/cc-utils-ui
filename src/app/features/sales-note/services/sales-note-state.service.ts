import { Injectable, signal, computed } from '@angular/core';
import {
  SalesNote,
  SalesNoteDates,
  Customer,
  Product,
  Currency
} from '../models/sales-note.model';

@Injectable()
export class SalesNoteStateService {
  private readonly _dates = signal<SalesNoteDates>({
    creationDate: new Date(),
    deliveryDate: new Date()
  });

  private readonly _customer = signal<Customer>({
    name: '',
    phone: '',
    email: ''
  });

  private readonly _products = signal<Product[]>([]);

  private readonly _currency = signal<Currency>('MXN');

  public readonly dates = this._dates.asReadonly();
  public readonly customer = this._customer.asReadonly();
  public readonly products = this._products.asReadonly();
  public readonly currency = this._currency.asReadonly();

  public readonly total = computed(() =>
    this._products().reduce((sum, p) => sum + p.total, 0)
  );

  public readonly isValid = computed(
    () => this._customer().name.trim() !== '' && this._products().length > 0
  );

  updateDates(dates: SalesNoteDates): void {
    this._dates.set(dates);
  }

  updateCustomer(customer: Customer): void {
    this._customer.set(customer);
  }

  updateCurrency(currency: Currency): void {
    this._currency.set(currency);
  }

  addProduct(product: Omit<Product, 'id' | 'total'>): void {
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID(),
      total: product.quantity * product.unitPrice
    };
    this._products.update((products) => [...products, newProduct]);
  }

  removeProduct(id: string): void {
    this._products.update((products) => products.filter((p) => p.id !== id));
  }

  updateProduct(id: string, updates: Partial<Omit<Product, 'id'>>): void {
    this._products.update((products) =>
      products.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          updated.total = updated.quantity * updated.unitPrice;
          return updated;
        }
        return p;
      })
    );
  }

  getSalesNote(): SalesNote {
    return {
      dates: this._dates(),
      customer: this._customer(),
      products: this._products(),
      total: this.total(),
      currency: this._currency(),
      createdAt: new Date()
    };
  }

  reset(): void {
    this._dates.set({
      creationDate: new Date(),
      deliveryDate: new Date()
    });
    this._customer.set({ name: '', phone: '', email: '' });
    this._products.set([]);
    this._currency.set('MXN');
  }
}
