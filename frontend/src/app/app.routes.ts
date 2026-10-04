/**
 * Definición de rutas de la aplicación.
 *
 * Cada ruta mapea una URL a un componente específico.
 * La ruta '**' redirige al home cuando no se encuentra ninguna.
 */
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CodigoComponent } from './pages/codigo/codigo';
import { BuscarComponent } from './pages/buscar/buscar';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de';
import { CreditosComponent } from './pages/creditos/creditos';
import { ContribuirComponent } from './pages/contribuir/contribuir';
import { CodigosComponent } from './pages/codigos/codigos';
import { SugerenciasComponent } from './pages/sugerencias/sugerencias';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'codigo/:codigo', component: CodigoComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'codigos', component: CodigosComponent },
  { path: 'acerca-de', component: AcercaDeComponent },
  { path: 'creditos', component: CreditosComponent },
  { path: 'contribuir', component: ContribuirComponent },
  { path: 'sugerencias', component: SugerenciasComponent },
  { path: '**', redirectTo: '' }
];
