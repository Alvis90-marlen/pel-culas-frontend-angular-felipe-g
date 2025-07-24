// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router'; // Importa RouterLink para la navegación

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink // Necesario para los enlaces de navegación en el header
  ],
  template: `
    <div>
      <!-- Header simple de la aplicación -->
      <header>
        <nav>
          <ul>
            <li>
              <button [routerLink]="['/peliculas']">
                Inicio
              </button>
            </li>
            <li>
              <button [routerLink]="['/admin/peliculas']">
                Administración
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <!-- Contenido principal de la aplicación (donde se cargarán las rutas) -->
      <main>
        <router-outlet></router-outlet>
      </main>

      <!-- Footer simple -->
      <footer>
        <p>&copy; {{ currentYear }} Vive Tu SAS. Todos los derechos reservados.</p>
      </footer>
    </div>
  `,
  styleUrls: ['./app.component.css'] // Puedes dejar este archivo CSS vacío o añadir estilos básicos
})
export class AppComponent {
  title = 'peliculas-frontend';
  currentYear: number = new Date().getFullYear(); // Para el año en el footer
}