import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ¡Importa FormsModule para [(ngModel)]!
// Ya no necesitamos Router aquí si solo cargamos la lista pública
// import { Router } from '@angular/router';
import { Pelicula, PeliculaService } from '../../servicios/pelicula.service';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // Necesario para usar [(ngModel)] en el HTML
  ],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  peliculas: Pelicula[] = [];
  searchText: string = ''; // Propiedad para el texto de búsqueda
  sortBy: string = ''; // Propiedad para el campo de ordenamiento
  sortDirection: string = 'desc'; // Propiedad para la dirección de ordenamiento (por defecto descendente)

  constructor(
    private peliculaService: PeliculaService,
    // Ya no necesitamos Router aquí
    // private router: Router
  ) {}

  ngOnInit(): void {
    // Al iniciar, carga las películas con el filtro "publicada" y los parámetros iniciales
    this.aplicarFiltros();
  }

  // Método unificado para aplicar filtros y ordenamiento
  aplicarFiltros(): void {
    this.peliculaService.getPeliculas(
      'publicada', // Siempre filtramos por estado 'publicada' para la vista pública
      this.searchText,
      this.sortBy,
      this.sortDirection
    ).subscribe(
      data => {
        this.peliculas = data;
      },
      error => {
        console.error('Error al cargar las películas con filtros:', error);
      }
    );
  }

  // Métodos goToAdmin, editarPelicula, eliminarPelicula han sido eliminados de aquí
  // porque ahora se manejarán desde PeliculasAdminComponent (o desde el header general)
}