/**
 * Componente de la página "Acerca de".
 *
 * Muestra información sobre el proyecto: por qué existe,
 * quién lo hace, principios, y cómo colaborar.
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acerca-de',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './acerca-de.html',
  styleUrl: './acerca-de.css'
})
export class AcercaDeComponent {}
