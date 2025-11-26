# CC Utils UI - Sales Notes Application

A modern Angular 21 utilities application featuring a sales notes generator with PDF export capabilities. Built with Material Design 3, featuring internationalization (i18n) support and a mobile-first responsive design.

## Features

- ✨ **Step-by-step Sales Note Creation**: 4-step vertical stepper workflow
- 📄 **PDF Generation**: Download sales notes as professional PDF documents
- 🌍 **Internationalization**: Full support for English and Spanish
- 💱 **Multi-currency**: Support for MXN (Mexican Peso) and USD (US Dollar)
- 📱 **Mobile-First Design**: Fully responsive across all devices
- ⚡ **Modern Angular 21**: Built with standalone components and signals
- 🎨 **Material Design 3**: Azure and Blue theme

## Tech Stack

- **Angular**: 21.0.0
- **Angular Material**: 21.0.0
- **TypeScript**: 5.9.2
- **@ngx-translate/core**: 17.0.0 (Internationalization)
- **jsPDF**: 3.0.4 (PDF generation)
- **html2canvas**: 1.4.1 (HTML to canvas conversion)
- **RxJS**: 7.8.0

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any source files.

### Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
npm test
```

## Project Structure

```
src/
├── app/
│   ├── core/                      # Core functionality
│   ├── shared/                    # Shared components and modules
│   ├── features/
│   │   └── sales-note/           # Sales Notes feature
│   │       ├── config/
│   │       │   └── business-info.config.ts    # Customizable business info
│   │       ├── models/
│   │       │   └── sales-note.model.ts        # Data models and interfaces
│   │       ├── services/
│   │       │   ├── sales-note-state.service.ts    # State management with signals
│   │       │   └── pdf-generator.service.ts       # PDF generation service
│   │       └── components/
│   │           ├── sales-note-container/      # Main container with stepper
│   │           ├── step-dates/                # Step 1: Date selection
│   │           ├── step-customer/             # Step 2: Customer information
│   │           ├── step-products/             # Step 3: Product management
│   │           ├── step-preview/              # Step 4: Preview and download
│   │           └── pdf-template/              # PDF template component
│   ├── app.routes.ts             # Application routing
│   └── app.config.ts             # Application configuration
└── assets/
    └── i18n/                     # Translation files
        ├── en.json               # English translations
        └── es.json               # Spanish translations
```

## Customization

### Business Information

To customize your business information that appears on the PDF, edit the file:

```typescript
// src/app/features/sales-note/config/business-info.config.ts

export const BUSINESS_INFO: BusinessInfo = {
  name: 'Your Business Name',
  phone: '+52 123 456 7890',
  whatsapp: '+52 123 456 7890',
  facebook: 'fb.com/yourbusiness'
};
```

### Adding More Languages

1. Create a new translation file in `src/assets/i18n/` (e.g., `fr.json`)
2. Copy the structure from `en.json` or `es.json`
3. Translate all the keys to your target language
4. Add the language option to the language selector in `sales-note-container.ts`:

```typescript
protected readonly availableLanguages = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' }  // Add your new language
];
```

### Customizing the PDF Template

The PDF template can be customized by editing:

- **Layout**: `src/app/features/sales-note/components/pdf-template/pdf-template.html`
- **Styling**: `src/app/features/sales-note/components/pdf-template/pdf-template.scss`

The template uses standard HTML and SCSS, making it easy to modify the design to match your brand.

## Workflow

The application follows a 4-step workflow:

1. **Dates**: Select creation date and delivery date (both default to today)
2. **Customer**: Enter customer information (name required, phone and email optional)
3. **Products**: Add products with quantity and unit price, select currency (MXN/USD)
4. **Preview & Download**: Review the sales note and download as PDF

### Features by Step

#### Step 1: Dates
- Material datepickers for easy date selection
- Default values set to current date
- Both dates are required fields

#### Step 2: Customer
- Name field (required, minimum 2 characters)
- Phone number (optional)
- Email address (optional, validated format)

#### Step 3: Products
- Add multiple products dynamically
- Inline editing of existing products (click edit icon)
- Automatic total calculation per product
- Currency selector (MXN/USD)
- Real-time total calculation
- Delete products with confirmation

#### Step 4: Preview & Download
- Live preview of the PDF document
- One-click PDF download
- Automatic filename generation: `nota-venta-{customer}-{date}.pdf`

## Key Technologies

### Signals (Angular 21+)

The application uses Angular's reactive signals for state management:

```typescript
// Reactive state management
private readonly _products = signal<Product[]>([]);
protected readonly total = computed(() =>
  this._products().reduce((sum, p) => sum + p.total, 0)
);
```

### Standalone Components

All components are standalone (no NgModules):

```typescript
@Component({
  selector: 'app-step-dates',
  imports: [ReactiveFormsModule, MatFormFieldModule, ...],
  templateUrl: './step-dates.html',
  styleUrl: './step-dates.scss'
})
export class StepDates { }
```

### Modern Control Flow

Uses Angular's new control flow syntax:

```html
@if (products().length > 0) {
  <div>Products available</div>
} @else {
  <div>No products</div>
}

@for (product of products(); track product.id) {
  <div>{{ product.name }}</div>
}
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

---

Built with ❤️ using Angular 21 and Material Design 3
