/**
 * Punto de entrada de la aplicación Angular.
 *
 * Usa bootstrapApplication() para inicializar la aplicación
 * con AppComponent como componente raíz y appConfig como
 * configuración global.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
