/**
 * Componente de ficha de código DTC.
 *
 * Muestra la información completa de un código: explicación,
 * síntomas, causas, pasos de diagnóstico, gravedad, etc.
 * Los campos JSON se parsean a arrays para mostrarlos como listas.
 */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, Codigo } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-codigo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './codigo.html',
  styleUrl: './codigo.css'
})
export class CodigoComponent implements OnInit {
  /** Ficha del código (null mientras carga o si no existe) */
  ficha: Codigo | null = null;

  /** Indica si todavía está cargando la ficha */
  cargando = true;

  /** Mensaje de error si el código no se encuentra */
  error = '';

  /** Resultados de búsqueda en Wikipedia para este código */
  wikiResults: any[] = [];

  /** Indica si se están cargando los resultados de Wikipedia */
  wikiCargando = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Escucha cambios en la ruta para cargar el código correspondiente
    this.route.params.subscribe(params => {
      const codigo = params['codigo'];
      this.cargarCodigo(codigo);
    });
  }

  /** Carga la ficha del código desde la API */
  cargarCodigo(codigo: string) {
    this.cargando = true;
    this.error = '';
    this.api.getCodigo(codigo).subscribe({
      next: (data) => {
        this.ficha = data;
        this.cargando = false;
        this.cdr.detectChanges();
        // Buscar información en la web después de tener la ficha
        this.buscarEnWeb(data.codigo, data.nombre_es || data.nombre_tecnico);
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'No se encontró este código';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  /** Busca información en Wikipedia para este código */
  buscarEnWeb(codigo: string, nombre: string) {
    this.wikiCargando = true;
    const query = `${codigo} ${nombre} OBD2`;
    this.api.buscarWikipedia(query).subscribe({
      next: (data) => {
        const resultados = data.query?.search || [];
        if (resultados.length === 0) {
          // Fallback: buscar solo "OBD2" si no hay resultados específicos
          this.api.buscarWikipedia('OBD2').subscribe({
            next: (fallback) => {
              this.wikiResults = fallback.query?.search || [];
              this.wikiCargando = false;
              this.cdr.detectChanges();
            },
            error: () => {
              this.wikiResults = [];
              this.wikiCargando = false;
              this.cdr.detectChanges();
            }
          });
        } else {
          this.wikiResults = resultados;
          this.wikiCargando = false;
          this.cdr.detectChanges();
        }
      },
      error: () => {
        this.wikiResults = [];
        this.wikiCargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  /** Parsea el campo de síntomas (JSON string) a array de strings */
  getSintomas(): string[] {
    if (!this.ficha?.sintomas) return [];
    try {
      return JSON.parse(this.ficha.sintomas as string);
    } catch {
      return [];
    }
  }

  /** Parsea el campo de causas (JSON string) a array de strings */
  getCausas(): string[] {
    if (!this.ficha?.causas) return [];
    try {
      return JSON.parse(this.ficha.causas as string);
    } catch {
      return [];
    }
  }

  /** Parsea el campo de pasos de diagnóstico (JSON string) a array */
  getPasos(): string[] {
    if (!this.ficha?.pasos_diagnostico) return [];
    try {
      return JSON.parse(this.ficha.pasos_diagnostico as string);
    } catch {
      return [];
    }
  }
}
