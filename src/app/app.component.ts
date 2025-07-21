// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  template: `
    <!-- Un título simple que se mostrará en todas las páginas -->
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Bienvenido a Películas</h1>
    <!-- Aquí se cargarán los componentes de tus rutas -->
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peliculas-frontend';
}
