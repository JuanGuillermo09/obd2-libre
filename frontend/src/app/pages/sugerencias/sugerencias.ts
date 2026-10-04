/**
 * Componente de administración de sugerencias.
 *
 * Lista las sugerencias recibidas desde el formulario de contribución.
 * Permite filtrar por estado y muestra los resultados en una tabla
 * con paginación.
 *
 * Solo los administradores logueados pueden cambiar estado y responder.
 */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sugerencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sugerencias.html',
  styleUrl: './sugerencias.css'
})
export class SugerenciasComponent implements OnInit {
  /** Lista completa de sugerencias */
  sugerencias: any[] = [];

  /** Sugerencias de la página actual */
  paginaSugerencias: any[] = [];

  /** Indica si está cargando */
  cargando = true;

  /** Filtro por estado */
  filtroEstado = '';

  /** Página actual */
  paginaActual = 1;

  /** Cantidad de registros por página */
  porPagina = 15;

  /** Total de páginas */
  totalPaginas = 1;

  /** Indica si el administrador está logueado */
  loggedIn = false;

  /** Email y contraseña para el login */
  adminEmail = '';
  adminPassword = '';

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
    this.cargarSugerencias();
  }

  cargarSugerencias() {
    this.cargando = true;
    this.api.getSugerencias(this.filtroEstado || undefined).subscribe({
      next: (data) => {
        this.sugerencias = data;
        this.totalPaginas = Math.max(1, Math.ceil(this.sugerencias.length / this.porPagina));
        this.paginaActual = 1;
        this.actualizarPagina();
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  cambiarFiltro() {
    this.paginaActual = 1;
    this.cargarSugerencias();
  }

  actualizarPagina() {
    const inicio = (this.paginaActual - 1) * this.porPagina;
    const fin = inicio + this.porPagina;
    this.paginaSugerencias = this.sugerencias.slice(inicio, fin);
  }

  irAPagina(pagina: number) {
    this.paginaActual = Math.max(1, Math.min(pagina, this.totalPaginas));
    this.actualizarPagina();
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

  /** Valida el login con credenciales de demo */
  login() {
    if (this.adminEmail === 'soporte@obd2libre.com' && this.adminPassword === 'admin123') {
      localStorage.setItem('loggedIn', 'true');
      this.loggedIn = true;
      this.adminEmail = '';
      this.adminPassword = '';
      this.cdr.detectChanges();
    } else {
      alert('Credenciales incorrectas');
    }
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.loggedIn = false;
    this.cdr.detectChanges();
  }

  /** Actualiza el estado de una sugerencia desde la UI */
  cambiarEstado(id: number, nuevoEstado: string) {
    if (!this.loggedIn) return;
    this.api.actualizarSugerencia(id, { estado: nuevoEstado }).subscribe({
      next: () => this.cargarSugerencias(),
      error: (err) => {
        console.error('Error al actualizar estado:', err.status, err.error);
        alert('Error al actualizar estado');
      }
    });
  }

  /** Actualiza la respuesta de una sugerencia desde la UI */
  responder(id: number, nuevaRespuesta: string) {
    if (!this.loggedIn) return;
    this.api.actualizarSugerencia(id, { respuesta: nuevaRespuesta }).subscribe({
      next: () => this.cargarSugerencias(),
      error: () => alert('Error al guardar respuesta')
    });
  }
}
