/**
 * Componente de la página de inicio.
 *
 * Muestra un buscador principal y los códigos más comunes.
 * Al buscar, redirige a la página de ficha del código.
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  /** Código ingresado por el usuario en el buscador */
  codigo = '';

  /** Lista de códigos frecuentes mostrados en la página */
  codigosComunes = ['P0300', 'P0420', 'P0171', 'P0442', 'P0128', 'P0455'];

  /** Descripciones cortas para mostrar debajo de cada código común */
  descripciones: Record<string, string> = {
    'P0300': 'Fallo de encendido aleatorio',
    'P0420': 'Catalizador ineficiente',
    'P0171': 'Mezcla pobre (banco 1)',
    'P0442': 'Fuga pequeña en sistema EVAP',
    'P0128': 'Termostato de refrigerante',
    'P0455': 'Fuga grande en sistema EVAP'
  };

  constructor(private router: Router) {}

  /** Navega a la ficha del código ingresado */
  buscar() {
    if (this.codigo.trim()) {
      this.router.navigate(['/codigo', this.codigo.trim().toUpperCase()]);
    }
  }

  /** Devuelve la descripción corta de un código común */
  getDescripcionCorta(codigo: string): string {
    return this.descripciones[codigo] || 'Ver ficha';
  }
}
