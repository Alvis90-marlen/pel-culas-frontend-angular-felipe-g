import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // Importa Router y RouterLink
import { Pelicula, PeliculaService } from '../../servicios/pelicula.service';

@Component({
  selector: 'app-peliculas-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink // Necesario para usar [routerLink] en el HTML
  ],
  templateUrl: './peliculas-admin.component.html',
  styleUrls: ['./peliculas-admin.component.css']
})
export class PeliculasAdminComponent implements OnInit {

  peliculas: Pelicula[] = [];

  constructor(
    private peliculaService: PeliculaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.peliculaService.getPeliculas().subscribe(
      data => {
        this.peliculas = data;
      },
      error => {
        console.error('Error al cargar las películas para administración:', error);
      }
    );
  }

  // Método para navegar al formulario de creación
  crearNuevaPelicula(): void {
    this.router.navigate(['/admin/peliculas/crear']);
  }

  // Método para editar una película existente
  editarPelicula(id: number): void {
    this.router.navigate(['/admin/peliculas/editar', id]);
  }

  // Método para eliminar una película
  eliminarPelicula(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta película? Esta acción es irreversible.')) {
      this.peliculaService.eliminarPelicula(id).subscribe(
        () => {
          console.log('Película eliminada con éxito');
          this.cargarPeliculas(); // Recarga la lista
        },
        error => {
          console.error('Error al eliminar la película:', error);
          alert('No se pudo eliminar la película. Consulta la consola para más detalles.');
        }
      );
    }
  }
}