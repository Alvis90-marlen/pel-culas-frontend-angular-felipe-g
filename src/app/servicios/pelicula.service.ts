import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importa HttpParams
import { Observable } from 'rxjs';

// Define la interfaz para tu modelo Pelicula, incluyendo los nuevos campos
// Es importante que los nombres de los campos aquí coincidan con los de tu entidad Pelicula.java
export interface Pelicula {
  id?: number; // El ID es opcional porque no existe al crear una nueva película
  titulo: string;
  director: string;
  anio: number;
  genero: string;
  imagen?: string; // URL de la imagen (opcional al crear)
  descripcion?: string;
  puntaje?: number;
  estado?: string; // 'publicada' o 'edicion'
  fechaCreacion?: string; // Usamos string para la fecha, Spring Boot lo mapeará a LocalDateTime
  fechaModificacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private apiUrl = 'http://localhost:8080/api/peliculas'; // URL base de tu API REST

  constructor(private http: HttpClient) { }

  // Obtener películas, ahora con parámetros opcionales para estado, título, ordenamiento
  getPeliculas(
    estado?: string,
    titulo?: string, // Nuevo parámetro para búsqueda
    sortBy?: string, // Nuevo parámetro para ordenamiento
    sortDirection?: string // Nuevo parámetro para dirección de ordenamiento
  ): Observable<Pelicula[]> {
    let params = new HttpParams();

    if (estado) {
      params = params.set('estado', estado);
    }
    if (titulo) {
      params = params.set('titulo', titulo);
    }
    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }
    if (sortDirection) {
      params = params.set('sortDirection', sortDirection);
    }

    return this.http.get<Pelicula[]>(this.apiUrl, { params });
  }

  // Obtener una película por ID (READ BY ID)
  getPeliculaById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva película (CREATE)
  crearPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  // Actualizar una película existente (UPDATE)
  actualizarPelicula(id: number, pelicula: Pelicula): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/${id}`, pelicula);
  }

  // Eliminar una película por ID (DELETE)
  eliminarPelicula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}