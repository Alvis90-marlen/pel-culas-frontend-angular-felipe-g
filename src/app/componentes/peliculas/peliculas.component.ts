import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { Pelicula, PeliculaService } from '../../servicios/pelicula.service';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [
    CommonModule // Necesario para *ngFor y date pipe
  ],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  peliculas: Pelicula[] = [];

  constructor(
    private peliculaService: PeliculaService,
    private router: Router // Inyecta Router
  ) {}

  ngOnInit(): void {
    // Al iniciar, carga solo las películas con estado 'publicada' para la vista pública
    this.cargarPeliculas('publicada');
  }

  // Método para cargar películas, ahora con un parámetro opcional de estado
  cargarPeliculas(estado?: string): void {
    this.peliculaService.getPeliculas(estado).subscribe(
      data => {
        this.peliculas = data;
      },
      error => {
        console.error('Error al cargar las películas:', error);
      }
    );
  }

  // Método para navegar a la página de administración
  goToAdmin(): void {
    this.router.navigate(['/admin/peliculas']);
  }

  // Método para editar una película (navegará al formulario de edición)
  editarPelicula(id: number): void {
    this.router.navigate(['/admin/peliculas/editar', id]);
  }

  // Método para eliminar una película
  eliminarPelicula(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      this.peliculaService.eliminarPelicula(id).subscribe(
        () => {
          console.log('Película eliminada con éxito');
          // Recarga la lista de películas con el filtro 'publicada'
          this.cargarPeliculas('publicada');
        },
        error => {
          console.error('Error al eliminar la película:', error);
          alert('No se pudo eliminar la película. Consulta la consola para más detalles.');
        }
      );
    }
  }
}