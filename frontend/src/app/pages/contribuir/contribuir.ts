/**
 * Componente del formulario de contribución.
 *
 * Permite a los usuarios enviar sugerencias: correcciones,
 * códigos nuevos o información de marca.
 * Tras enviar, muestra un mensaje de confirmación.
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contribuir',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './contribuir.html',
  styleUrl: './contribuir.css'
})
export class ContribuirComponent {
  /** Código DTC al que se refiere la sugerencia */
  codigo = '';

  /** Tipo de contribución */
  tipo = 'correccion';

  /** Mensaje del usuario */
  contenido = '';

  /** Correo o red social (opcional) */
  contacto = '';

  /** Indica si la sugerencia fue enviada exitosamente */
  enviado = false;

  constructor(private api: ApiService) {}

  /** Envía la sugerencia al backend */
  enviar() {
    this.api.enviarSugerencia({
      codigo: this.codigo,
      tipo: this.tipo,
      contenido: this.contenido,
      contacto: this.contacto || undefined
    }).subscribe({
      next: () => {
        this.enviado = true;
      },
      error: (err) => {
        alert('Error al enviar: ' + (err.error?.mensaje || 'Intenta de nuevo'));
      }
    });
  }
}
