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
    <div class="min-h-screen bg-gray-100 font-sans antialiased">
      <!-- Header de la aplicación -->
      <header class="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 shadow-lg">
        <div class="container mx-auto flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <!-- Logo simple de Vive Tu SAS (o un icono genérico) -->
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-2xl font-bold tracking-tight">Vive Tu SAS - Películas</span>
          </div>
          <nav>
            <ul class="flex space-x-4">
              <li>
                <button [routerLink]="['/peliculas']"
                        class="text-white hover:text-blue-200 transition duration-300 ease-in-out px-3 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75">
                  Inicio
                </button>
              </li>
              <li>
                <button [routerLink]="['/admin/peliculas']"
                        class="text-white hover:text-blue-200 transition duration-300 ease-in-out px-3 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75">
                  Administración
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <!-- Contenido principal de la aplicación (donde se cargarán las rutas) -->
      <main class="container mx-auto py-8">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer simple -->
      <footer class="bg-gray-800 text-white text-center p-4 mt-8">
        <p>&copy; {{ currentYear }} Vive Tu SAS. Todos los derechos reservados.</p>
      </footer>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peliculas-frontend';
  currentYear: number = new Date().getFullYear(); // Para el año en el footer
}
