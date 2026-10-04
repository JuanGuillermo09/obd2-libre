/**
 * Componente de listado de todos los códigos DTC.
 *
 * Permite filtrar por categoría (P, B, C, U) y por marca.
 * Los resultados se muestran paginados (20 por página).
 */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, CodigoResumen } from '../../services/api.service';
import { CommonModule } from '@angular/common';

/** Estructura de una marca (viene de la API /api/marcas) */
interface Marca {
  id: number;
  nombre: string;
  nombre_visible: string;
  prioridad: number;
}

@Component({
  selector: 'app-codigos',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './codigos.html',
  styleUrl: './codigos.css'
})
export class CodigosComponent implements OnInit {
  /** Lista de códigos de la página actual */
  codigos: CodigoResumen[] = [];

  /** Marcas disponibles para el filtro */
  marcas: Marca[] = [];

  /** Total de resultados (para paginación) */
  total = 0;

  /** Página actual */
  paginaActual = 1;

  /** Total de páginas */
  totalPaginas = 1;

  /** Indica si se están cargando los resultados */
  cargando = true;

  /** Filtro por categoría (P, B, C, U) */
  filtroCategoria = '';

  /** Filtro por marca */
  filtroMarca = '';

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Carga las marcas para el dropdown y los códigos iniciales
    this.cargarMarcas();
    this.cargarCodigos();
  }

  /** Obtiene las marcas disponibles desde la API */
  cargarMarcas() {
    this.api.getMarcas().subscribe((marcas: Marca[]) => {
      this.marcas = marcas;
      this.cdr.detectChanges();
    });
  }

  /** Al cambiar un filtro, reinicia a la página 1 y recarga */
  cambiarFiltro() {
    this.paginaActual = 1;
    this.cargarCodigos();
  }

  /** Carga los códigos según los filtros y la página actual */
  cargarCodigos() {
    this.cargando = true;
    let params: any = { pagina: this.paginaActual, porPagina: 20 };

    if (this.filtroCategoria) {
      params.categoria = this.filtroCategoria;
    }
    if (this.filtroMarca) {
      params.marca = this.filtroMarca;
    }

    this.api.getCodigos(params).subscribe({
      next: (data) => {
        this.codigos = data.datos;
        this.total = data.paginacion.total;
        this.totalPaginas = data.paginacion.totalPaginas;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  /** Navega a una página específica de resultados */
  irAPagina(pagina: number) {
    this.paginaActual = pagina;
    this.cargarCodigos();
  }

  /** Genera un array con las páginas a mostrar en el paginador */
  getPaginas(): number[] {
    const paginas: number[] = [];
    const inicio = Math.max(1, this.paginaActual - 2);
    const fin = Math.min(this.totalPaginas, this.paginaActual + 2);
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  }
}
