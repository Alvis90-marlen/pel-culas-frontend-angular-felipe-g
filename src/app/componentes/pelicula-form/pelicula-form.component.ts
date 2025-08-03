import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula, PeliculaService } from '../../servicios/pelicula.service';

@Component({
  selector: 'app-pelicula-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './pelicula-form.component.html',
  styleUrls: ['./pelicula-form.component.css'] // Este archivo debe estar vacío
})
export class PeliculaFormComponent implements OnInit {
  peliculaForm: FormGroup;
  isEditMode = false;
  peliculaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private peliculaService: PeliculaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.peliculaForm = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      director: [''],
      anio: [null, [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear() + 5)]],
      genero: [''],
      imagen: [''],
      descripcion: [''],
      puntaje: [null, [Validators.min(0), Validators.max(10)]],
      // El estado ahora incluye 'alquilada' como una opción válida
      estado: ['edicion', Validators.required],
    });
    console.log('PeliculaFormComponent: Constructor ejecutado.');
  }

  ngOnInit(): void {
    console.log('PeliculaFormComponent: ngOnInit ejecutado.');
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.peliculaId = +idParam;
        this.isEditMode = true;
        this.cargarPelicula(this.peliculaId);
      }
    });
  }

  cargarPelicula(id: number): void {
    console.log('PeliculaFormComponent: cargandoPelicula() para ID:', id);
    this.peliculaService.getPeliculaById(id).subscribe({
      next: pelicula => {
        console.log('PeliculaFormComponent: Película cargada:', pelicula);
        this.peliculaForm.patchValue(pelicula);
      },
      error: error => {
        console.error('PeliculaFormComponent: Error al cargar la película para edición:', error);
        alert('No se pudo cargar la película para edición. Revisa la consola.');
        this.router.navigate(['/admin/peliculas']);
      }
    });
  }

  onSubmit(): void {
    console.log('PeliculaFormComponent: onSubmit() llamado.');
    if (this.peliculaForm.valid) {
      const pelicula: Pelicula = this.peliculaForm.value;
      console.log('PeliculaFormComponent: Datos del formulario válidos:', pelicula);

      if (this.isEditMode && this.peliculaId) {
        console.log('PeliculaFormComponent: Modo edición. Actualizando película con ID:', this.peliculaId);
        this.peliculaService.actualizarPelicula(this.peliculaId, pelicula).subscribe({
          next: () => {
            alert('Película actualizada con éxito!');
            this.router.navigate(['/admin/peliculas']);
          },
          error: error => {
            console.error('PeliculaFormComponent: Error al actualizar la película:', error);
            alert('Error al actualizar la película. Revisa la consola.');
          }
        });
      } else {
        console.log('PeliculaFormComponent: Modo creación. Creando nueva película.');
        this.peliculaService.crearPelicula(pelicula).subscribe({
          next: () => {
            alert('Película creada con éxito!');
            this.router.navigate(['/admin/peliculas']);
          },
          error: error => {
            console.error('PeliculaFormComponent: Error al crear la película:', error);
            alert('Error al crear la película. Revisa la consola.');
          }
        });
      }
    } else {
      console.warn('PeliculaFormComponent: Formulario inválido. Marcando campos como tocados.');
      alert('Por favor, completa todos los campos requeridos y corrige los errores.');
      this.peliculaForm.markAllAsTouched();
    }
  }

  goBack(): void {
    console.log('PeliculaFormComponent: goBack() llamado. Navegando a /admin/peliculas...');
    this.router.navigate(['/admin/peliculas']);
  }
}