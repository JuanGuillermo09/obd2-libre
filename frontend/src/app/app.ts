/**
 * Componente raíz de la aplicación.
 *
 * Define el layout principal (header, main, footer) y usa
 * RouterOutlet para renderizar los componentes según la ruta.
 * El logo de fondo sutil está en app.html.
 */
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  mobileMenuOpen = false;
}
