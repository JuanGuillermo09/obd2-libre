/**
 * Componente de búsqueda de códigos.
 *
 * Permite buscar códigos por texto libre (código, nombre, síntoma).
 * Muestra los resultados en una lista ordenada por relevancia.
 */
import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, CodigoResumen } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './buscar.html',
  styleUrl: './buscar.css'
})
export class BuscarComponent {
  /** Texto de búsqueda */
  query = '';

  /** Resultados de la búsqueda */
  resultados: CodigoResumen[] = [];

  /** Indica si se está ejecutando la búsqueda */
  cargando = false;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  /** Ejecuta la búsqueda cuando el usuario escribe al menos 2 caracteres */
  buscar() {
    if (this.query.length < 2) {
      this.resultados = [];
      return;
    }

    this.cargando = true;
    this.api.buscar(this.query).subscribe({
      next: (data) => {
        this.resultados = data.resultados;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.resultados = [];
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}
