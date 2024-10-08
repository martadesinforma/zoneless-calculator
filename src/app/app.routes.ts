import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    loadComponent: () => import('./calculator/views/calculator-view/calculator-view.component'),
  },
  {
    path: '**', /* cualquier ruta que no haya sido previamente definida en las rutas de tu aplicación */
    redirectTo: 'calculator',
  }
];
