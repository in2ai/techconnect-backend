import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'patients',
    loadComponent: () =>
      import('./features/patients/pages/patient-list/patient-list.page').then((m) => m.PatientListPage),
  },
  {
    path: 'patients/:nhc',
    loadComponent: () =>
      import('./features/patients/pages/patient-detail/patient-detail.page').then((m) => m.PatientDetailPage),
  },
  {
    path: 'tumors',
    loadComponent: () =>
      import('./features/tumors/pages/tumor-list/tumor-list.page').then((m) => m.TumorListPage),
  },
  {
    path: 'tumors/:biobank_code',
    loadComponent: () =>
      import('./features/tumors/pages/tumor-detail/tumor-detail.page').then((m) => m.TumorDetailPage),
  },
  {
    path: 'biomodels',
    loadComponent: () =>
      import('./features/biomodels/pages/biomodel-list/biomodel-list.page').then((m) => m.BiomodelListPage),
  },
  {
    path: 'biomodels/:id',
    loadComponent: () =>
      import('./features/biomodels/pages/biomodel-detail/biomodel-detail.page').then((m) => m.BiomodelDetailPage),
  },
  {
    path: 'passages',
    loadComponent: () =>
      import('./features/passages/pages/passage-list/passage-list.page').then((m) => m.PassageListPage),
  },
  {
    path: 'passages/:id',
    loadComponent: () =>
      import('./features/passages/pages/passage-detail/passage-detail.page').then((m) => m.PassageDetailPage),
  },
  {
    path: 'trials',
    loadComponent: () =>
      import('./features/trials/pages/trial-list/trial-list.page').then((m) => m.TrialListPage),
  },
  {
    path: 'trials/:id',
    loadComponent: () =>
      import('./features/trials/pages/trial-detail/trial-detail.page').then((m) => m.TrialDetailPage),
  },
  {
    path: 'liquid-biopsies',
    loadComponent: () =>
      import('./features/liquid-biopsies/pages/liquid-biopsy-list/liquid-biopsy-list.page').then((m) => m.LiquidBiopsyListPage),
  },
  {
    path: 'liquid-biopsies/:id',
    loadComponent: () =>
      import('./features/liquid-biopsies/pages/liquid-biopsy-detail/liquid-biopsy-detail.page').then((m) => m.LiquidBiopsyDetailPage),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
