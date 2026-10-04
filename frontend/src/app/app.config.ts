/**
 * Configuración global de la aplicación Angular.
 *
 * Provee el router (con las rutas definidas en app.routes.ts)
 * y el HttpClient para que los servicios puedan hacer peticiones.
 */
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
