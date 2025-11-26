import { Component } from '@angular/core';
import { PdfTemplate } from '../pdf-template/pdf-template';
import { SalesNoteStateService } from '../../services/sales-note-state.service';
import { SalesNoteDates, Customer, Product, Currency } from '../../models/sales-note.model';

@Component({
  selector: 'app-pdf-viewer',
  imports: [PdfTemplate],
  providers: [SalesNoteStateService], // Provide a separate instance for dummy data
  templateUrl: './pdf-viewer.html',
  styleUrl: './pdf-viewer.scss'
})
export class PdfViewer {
  constructor(private stateService: SalesNoteStateService) {
    this.loadDummyData();
  }

  private loadDummyData(): void {
    // Set dummy dates
    this.stateService.updateDates({
      creationDate: new Date(2025, 10, 25), // November 25, 2025
      deliveryDate: new Date(2025, 10, 30)  // November 30, 2025
    });

    // Set dummy customer
    this.stateService.updateCustomer({
      name: 'Juan Pérez García',
      phone: '+52 33 1234 5678',
      email: 'juan.perez@ejemplo.com'
    });

    // Set dummy currency
    this.stateService.updateCurrency('MXN');

    // Add dummy products
    const dummyProducts: Omit<Product, 'id' | 'total'>[] = [
      {
        name: 'Laptop Dell Inspiron 15',
        quantity: 2,
        unitPrice: 15999.99
      },
      {
        name: 'Mouse Inalámbrico Logitech MX Master 3',
        quantity: 3,
        unitPrice: 1299.50
      },
      {
        name: 'Teclado Mecánico Keychron K2',
        quantity: 2,
        unitPrice: 2499.00
      },
      {
        name: 'Monitor LG UltraWide 34" 4K',
        quantity: 1,
        unitPrice: 12999.99
      },
      {
        name: 'Webcam Logitech C920 HD Pro',
        quantity: 2,
        unitPrice: 1899.00
      }
    ];

    dummyProducts.forEach(product => {
      this.stateService.addProduct(product);
    });
  }
}
