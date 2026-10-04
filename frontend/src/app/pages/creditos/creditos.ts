/**
 * Componente de la página "Créditos y licencias".
 *
 * Muestra las fuentes de datos, licencia del contenido,
 * tecnologías utilizadas y agradecimientos.
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-creditos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './creditos.html',
  styleUrl: './creditos.css'
})
export class CreditosComponent {}
