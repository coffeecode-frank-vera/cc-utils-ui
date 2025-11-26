import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sales-notes',
    pathMatch: 'full'
  },
  {
    path: 'sales-notes',
    loadComponent: () =>
      import('./features/sales-note/components/sales-note-container/sales-note-container').then(
        (m) => m.SalesNoteContainer
      )
  },
  {
    path: 'sales-notes/preview',
    loadComponent: () =>
      import('./features/sales-note/components/pdf-viewer/pdf-viewer').then(
        (m) => m.PdfViewer
      )
  },
  {
    path: '**',
    redirectTo: 'sales-notes'
  }
];
