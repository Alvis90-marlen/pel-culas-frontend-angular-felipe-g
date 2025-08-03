import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Pelicula, PeliculaService } from '../../servicios/pelicula.service';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'] // Este archivo debe estar vacío
})
export class PeliculasComponent implements OnInit {

  peliculas: Pelicula[] = [];
  searchText: string = '';
  sortBy: string = '';
  sortDirection: string = 'desc';

  constructor(
    private peliculaService: PeliculaService,
    private router: Router
  ) {
    console.log('PeliculasComponent: Constructor ejecutado. Intentando inyectar PeliculaService.');
    if (this.peliculaService) {
      console.log('PeliculasComponent: PeliculaService inyectado con éxito.');
    } else {
      console.error('PeliculasComponent: ERROR - PeliculaService NO fue inyectado.');
    }
  }

  ngOnInit(): void {
    console.log('PeliculasComponent: ngOnInit ejecutado.');
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    console.log('PeliculasComponent: aplicandoFiltros() llamado.');
    console.log('PeliculasComponent: Parámetros de filtro:', { searchText: this.searchText, sortBy: this.sortBy, sortDirection: this.sortDirection });

    // Para la vista pública, solo mostramos películas 'publicada' y 'alquilada'
    // Las películas en 'edicion' no deberían aparecer aquí.
    this.peliculaService.getPeliculas(
      '', // No filtramos por estado aquí, el backend ya maneja los estados visibles.
      this.searchText,
      this.sortBy,
      this.sortDirection
    ).subscribe({
      next: (data) => {
        // Filtramos en el frontend para mostrar solo 'publicada' o 'alquilada' en la vista pública
        this.peliculas = data.filter(p => p.estado === 'publicada' || p.estado === 'alquilada');
        console.log('PeliculasComponent: Películas cargadas y filtradas con éxito:', this.peliculas);
        if (this.peliculas.length === 0) {
          console.log('PeliculasComponent: No se encontraron películas con los filtros actuales.');
        }
      },
      error: (err) => {
        console.error('PeliculasComponent: ERROR al cargar las películas:', err);
        alert('Error al cargar las películas. Por favor, revisa la consola para más detalles.');
      },
      complete: () => {
        console.log('PeliculasComponent: Suscripción a getPeliculas completada.');
      }
    });
  }

  goToAdmin(): void {
    console.log('PeliculasComponent: goToAdmin() llamado. Navegando a /admin/peliculas...');
    this.router.navigate(['/admin/peliculas']).catch(err => {
      console.error('PeliculasComponent: ERROR al navegar a /admin/peliculas:', err);
      alert('Error al navegar a la página de administración. Revisa la consola.');
    });
  }

  // NUEVO: Método para alquilar o devolver una película
  alquilarDevolverPelicula(id: number, estadoActual: string): void {
    console.log(`PeliculasComponent: alquilarDevolverPelicula() llamado para ID: ${id}, estado actual: ${estadoActual}`);
    let confirmMessage = '';
    if (estadoActual === 'publicada') {
      confirmMessage = '¿Estás seguro de que quieres alquilar esta película?';
    } else if (estadoActual === 'alquilada') {
      confirmMessage = '¿Estás seguro de que quieres devolver esta película?';
    } else {
      // Si el estado es 'edicion' o cualquier otro, no debería ser clicable, pero por si acaso.
      alert('Esta película no está disponible para alquiler/devolución en este momento.');
      return;
    }

    if (confirm(confirmMessage)) {
      this.peliculaService.alquilarPelicula(id).subscribe({
        next: (peliculaActualizada) => {
          console.log('PeliculasComponent: Estado de película actualizado con éxito:', peliculaActualizada);
          // Actualiza la película en la lista local para que el cambio se refleje inmediatamente
          const index = this.peliculas.findIndex(p => p.id === peliculaActualizada.id);
          if (index !== -1) {
            this.peliculas[index] = peliculaActualizada;
          }
          alert(`Película "${peliculaActualizada.titulo}" ahora está ${peliculaActualizada.estado === 'alquilada' ? 'alquilada' : 'disponible'}.`);
        },
        error: (err) => {
          console.error('PeliculasComponent: ERROR al cambiar el estado de la película:', err);
          alert('Error al cambiar el estado de la película. Revisa la consola para más detalles.');
        }
      });
    } else {
      console.log('PeliculasComponent: Acción de alquiler/devolución cancelada.');
    }
  }

  editarPelicula(id: number): void {
    console.log('PeliculasComponent: editarPelicula() llamado para ID:', id);
    this.router.navigate(['/admin/peliculas/editar', id]).catch(err => {
      console.error('PeliculasComponent: ERROR al navegar a /admin/peliculas/editar:', err);
      alert('Error al navegar para editar la película. Revisa la consola.');
    });
  }

  eliminarPelicula(id: number): void {
    console.log('PeliculasComponent: eliminarPelicula() llamado para ID:', id);
    if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      console.log('PeliculasComponent: Confirmación de eliminación aceptada para ID:', id);
      this.peliculaService.eliminarPelicula(id).subscribe({
        next: () => {
          console.log('PeliculasComponent: Película eliminada con éxito (desde el frontend).');
          this.aplicarFiltros(); // Recarga la lista
        },
        error: (err) => {
          console.error('PeliculasComponent: ERROR al eliminar la película:', err);
          alert('Error al eliminar la película. Revisa la consola para más detalles.');
        },
        complete: () => {
          console.log('PeliculasComponent: Suscripción a eliminarPelicula completada.');
        }
      });
    } else {
      console.log('PeliculasComponent: Eliminación cancelada para ID:', id);
    }
  }
}