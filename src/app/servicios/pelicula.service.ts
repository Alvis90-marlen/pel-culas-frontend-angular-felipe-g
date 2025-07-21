import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importa HttpParams
import { Observable } from 'rxjs';

export interface Pelicula {
  id?: number;
  titulo: string;
  director: string;
  anio: number;
  genero: string;
  imagen?: string;
  descripcion?: string;
  puntaje?: number;
  estado?: string;
  fechaCreacion?: string;
  fechaModificacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private apiUrl = 'http://localhost:8080/api/peliculas';

  constructor(private http: HttpClient) { }

  // Obtener películas, opcionalmente filtradas por estado
  getPeliculas(estado?: string): Observable<Pelicula[]> { // estado ahora es opcional
    let params = new HttpParams();
    if (estado) {
      params = params.set('estado', estado);
    }
    return this.http.get<Pelicula[]>(this.apiUrl, { params });
  }

  // Resto de métodos (getPeliculaById, crearPelicula, actualizarPelicula, eliminarPelicula)
  // ... (mantén los mismos métodos que ya tenías)
  getPeliculaById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  crearPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  actualizarPelicula(id: number, pelicula: Pelicula): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/${id}`, pelicula);
  }

  eliminarPelicula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
