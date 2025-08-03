import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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
  ) {
    console.log('PeliculasAdminComponent: Constructor ejecutado. Intentando inyectar PeliculaService.');
    if (this.peliculaService) {
      console.log('PeliculasAdminComponent: PeliculaService inyectado con éxito.');
    } else {
      console.error('PeliculasAdminComponent: ERROR - PeliculaService NO fue inyectado.');
    }
  }

  ngOnInit(): void {
    console.log('PeliculasAdminComponent: ngOnInit ejecutado.');
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    console.log('PeliculasAdminComponent: cargarPeliculas() llamado.');
    // Llama al servicio sin filtros de estado para obtener todas las películas para administración
    this.peliculaService.getPeliculas().subscribe({
      next: (data) => {
        this.peliculas = data;
        console.log('PeliculasAdminComponent: Películas cargadas para administración:', this.peliculas);
      },
      error: (err) => {
        console.error('PeliculasAdminComponent: ERROR al cargar las películas para administración:', err);
        alert('Error al cargar las películas para administración. Revisa la consola.');
      },
      complete: () => {
        console.log('PeliculasAdminComponent: Suscripción a getPeliculas (admin) completada.');
      }
    });
  }

  crearNuevaPelicula(): void {
    console.log('PeliculasAdminComponent: crearNuevaPelicula() llamado. Navegando a /admin/peliculas/crear...');
    this.router.navigate(['/admin/peliculas/crear']).catch(err => {
      console.error('PeliculasAdminComponent: ERROR al navegar a /admin/peliculas/crear:', err);
      alert('Error al navegar para crear película. Revisa la consola.');
    });
  }

  editarPelicula(id: number): void {
    console.log('PeliculasAdminComponent: editarPelicula() llamado para ID:', id);
    this.router.navigate(['/admin/peliculas/editar', id]).catch(err => {
      console.error('PeliculasAdminComponent: ERROR al navegar a /admin/peliculas/editar:', err);
      alert('Error al navegar para editar película. Revisa la consola.');
    });
  }

  eliminarPelicula(id: number): void {
    console.log('PeliculasAdminComponent: eliminarPelicula() llamado para ID:', id);
    if (confirm('¿Estás seguro de que quieres eliminar esta película? Esta acción es irreversible.')) {
      console.log('PeliculasAdminComponent: Confirmación de eliminación aceptada para ID:', id);
      this.peliculaService.eliminarPelicula(id).subscribe({
        next: () => {
          console.log('PeliculasAdminComponent: Película eliminada con éxito (desde admin).');
          this.cargarPeliculas(); // Recarga la lista después de eliminar
        },
        error: (err) => {
          console.error('PeliculasAdminComponent: ERROR al eliminar la película:', err);
          alert('No se pudo eliminar la película. Revisa la consola para más detalles.');
        },
        complete: () => {
          console.log('PeliculasAdminComponent: Suscripción a eliminarPelicula (admin) completada.');
        }
      });
    } else {
      console.log('PeliculasAdminComponent: Eliminación cancelada para ID:', id);
    }
  }
}
