import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Inicio | Fotografía Profesional',
  },
  {
    path: 'portafolio',
    loadComponent: () =>
      import('./features/portfolio/portfolio.component').then(
        (m) => m.PortfolioComponent
      ),
    title: 'Portafolio | Fotografía Profesional',
  },
  {
    path: 'sobre-mi',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
    title: 'Sobre Mí | Fotografía Profesional',
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('./features/services-page/services-page.component').then(
        (m) => m.ServicesPageComponent
      ),
    title: 'Servicios | Fotografía Profesional',
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./features/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    title: 'Contacto | Fotografía Profesional',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
