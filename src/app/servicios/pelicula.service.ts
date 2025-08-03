import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private http: HttpClient) {
    console.log('PeliculaService: Servicio inicializado con apiUrl:', this.apiUrl);
  }

  getPeliculas(
    estado?: string,
    titulo?: string,
    sortBy?: string,
    sortDirection?: string
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
    console.log('PeliculaService: Realizando GET a:', this.apiUrl, 'con params:', params.toString());
    return this.http.get<Pelicula[]>(this.apiUrl, { params });
  }

  getPeliculaById(id: number): Observable<Pelicula> {
    console.log('PeliculaService: Realizando GET by ID a:', `${this.apiUrl}/${id}`);
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  crearPelicula(pelicula: Pelicula): Observable<Pelicula> {
    console.log('PeliculaService: Realizando POST a:', this.apiUrl, 'con datos:', pelicula);
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  actualizarPelicula(id: number, pelicula: Pelicula): Observable<Pelicula> {
    console.log('PeliculaService: Realizando PUT a:', `${this.apiUrl}/${id}`, 'con datos:', pelicula);
    return this.http.put<Pelicula>(`${this.apiUrl}/${id}`, pelicula);
  }

  eliminarPelicula(id: number): Observable<void> {
    console.log('PeliculaService: Realizando DELETE a:', `${this.apiUrl}/${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
 
  alquilarPelicula(id: number): Observable<Pelicula> {
    console.log('PeliculaService: Realizando PUT para alquilar/devolver a:', `${this.apiUrl}/${id}/alquilar`);
    return this.http.put<Pelicula>(`${this.apiUrl}/${id}/alquilar`, {});
  }
}