import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clientes',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/clientes/pages/listagem/listagem.component').then(m => m.ListagemComponent),
      },
      {
        path: 'novo',
        loadComponent: () =>
          import('./features/clientes/pages/formulario/formulario.component').then(m => m.FormularioComponent),
      },
      {
        path: 'editar/:id',
        loadComponent: () =>
          import('./features/clientes/pages/formulario/formulario.component').then(m => m.FormularioComponent),
      }
    ]
  },
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  }
];