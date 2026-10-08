/**
 * Servicio de API.
 *
 * Centraliza todas las peticiones HTTP al backend.
 * Usa HttpClient de Angular para hacer GET y POST.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Representa una ficha completa de código DTC */
export interface Codigo {
  codigo: string;
  categoria: string;
  nombre_tecnico: string;
  nombre_es?: string;
  explicacion?: string;
  sintomas?: string;
  causas?: string;
  pasos_diagnostico?: string;
  gravedad?: string;
  se_puede_manejar?: string;
  estado: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
  revisor?: string;
  fuente_base?: string;
}

/** Representa un resumen de código DTC (para listas) */
export interface CodigoResumen {
  codigo: string;
  categoria: string;
  nombre_tecnico: string;
  nombre_es?: string;
  estado: string;
  gravedad?: string;
  se_puede_manejar?: string;
}

/** Resultado de la búsqueda de códigos */
export interface BusquedaResultado {
  query: string;
  total: number;
  resultados: CodigoResumen[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /** Obtiene la ficha completa de un código */
  getCodigo(codigo: string): Observable<Codigo> {
    return this.http.get<Codigo>(`${this.apiUrl}/codigos/${codigo}`);
  }

  /** Busca códigos por texto */
  buscar(query: string): Observable<BusquedaResultado> {
    return this.http.get<BusquedaResultado>(`${this.apiUrl}/buscar?q=${encodeURIComponent(query)}`);
  }

  /** Lista códigos con filtros y paginación */
  getCodigos(params: any): Observable<any> {
    const queryParams = new URLSearchParams(params).toString();
    return this.http.get<any>(`${this.apiUrl}/codigos?${queryParams}`);
  }

  /** Obtiene el resumen de categorías */
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias`);
  }

  /** Obtiene las marcas disponibles */
  getMarcas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/marcas`);
  }

  /** Envía una sugerencia de la comunidad */
  enviarSugerencia(data: { codigo: string; tipo: string; contenido: string; contacto?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/sugerencias`, data);
  }

  /** Obtiene todas las sugerencias enviadas por la comunidad */
  getSugerencias(estado?: string): Observable<any[]> {
    let url = `${this.apiUrl}/sugerencias`;
    if (estado) {
      url += `?estado=${estado}`;
    }
    return this.http.get<any[]>(url);
  }

  /** Actualiza una sugerencia (estado y/o respuesta) */
  actualizarSugerencia(id: number, data: { estado?: string; respuesta?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/sugerencias/${id}`, data);
  }

  /** Busca información en Wikipedia (sin API key, desde el navegador) */
  buscarWikipedia(query: string): Observable<any> {
    const url = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=5`;
    return this.http.get<any>(url);
  }

  /** Busca información en la web (desde el backend, sin API key) */
  buscarWeb(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/buscar-web?q=${encodeURIComponent(query)}`);
  }
}
