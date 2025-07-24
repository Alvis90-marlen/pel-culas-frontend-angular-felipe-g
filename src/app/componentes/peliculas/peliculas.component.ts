import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ¡Importa FormsModule para [(ngModel)]!
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
    private router: Router
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

  goToAdmin(): void {
    this.router.navigate(['/admin/peliculas']);
  }

  editarPelicula(id: number): void {
    this.router.navigate(['/admin/peliculas/editar', id]);
  }

  eliminarPelicula(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      this.peliculaService.eliminarPelicula(id).subscribe(
        () => {
          console.log('Película eliminada con éxito');
          // Recarga la lista de películas con los filtros actuales
          this.aplicarFiltros();
        },
        error => {
          console.error('Error al eliminar la película:', error);
          alert('No se pudo eliminar la película. Consulta la consola para más detalles.');
        }
      );
    }
  }
}