import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute para obtener parámetros de ruta
import { Pelicula, PeliculaService } from '../../servicios/pelicula.service';

@Component({
  selector: 'app-pelicula-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule // Necesario para usar formularios reactivos
  ],
  templateUrl: './pelicula-form.component.html',
  styleUrls: ['./pelicula-form.component.css']
})
export class PeliculaFormComponent implements OnInit {
  peliculaForm: FormGroup;
  isEditMode = false; // Para saber si estamos creando o editando
  peliculaId: number | null = null; // Guardará el ID de la película si estamos editando

  constructor(
    private fb: FormBuilder, // FormBuilder ayuda a construir formularios reactivos
    private peliculaService: PeliculaService,
    private router: Router,
    private route: ActivatedRoute // Para acceder a los parámetros de la URL
  ) {
    // Inicializa el formulario con todos los campos y sus validadores
    this.peliculaForm = this.fb.group({
      id: [null], // El ID será null para nuevas películas, o el ID para edición
      titulo: ['', Validators.required],
      director: [''],
      anio: [null, [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear() + 5)]], // Año válido
      genero: [''],
      imagen: [''],
      descripcion: [''],
      puntaje: [null, [Validators.min(0), Validators.max(10)]], // Puntaje entre 0 y 10
      estado: ['edicion', Validators.required], // Valor por defecto 'edicion'
      // fechaCreacion y fechaModificacion no se incluyen en el formulario
      // porque se gestionan automáticamente en el backend.
    });
  }

  ngOnInit(): void {
    // Suscribe a los parámetros de la ruta para detectar si es modo edición
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.peliculaId = +idParam; // Convierte el string a number
        this.isEditMode = true;
        this.cargarPelicula(this.peliculaId); // Carga los datos de la película para editar
      }
    });
  }

  cargarPelicula(id: number): void {
    this.peliculaService.getPeliculaById(id).subscribe(
      pelicula => {
        // Rellena el formulario con los datos de la película
        this.peliculaForm.patchValue(pelicula);
      },
      error => {
        console.error('Error al cargar la película para edición:', error);
        alert('No se pudo cargar la película para edición.');
        this.router.navigate(['/admin/peliculas']); // Vuelve a la lista si hay error
      }
    );
  }

  // Método que se llama al enviar el formulario
  onSubmit(): void {
    if (this.peliculaForm.valid) {
      const pelicula: Pelicula = this.peliculaForm.value;

      if (this.isEditMode && this.peliculaId) {
        // Modo edición: llama al servicio para actualizar
        this.peliculaService.actualizarPelicula(this.peliculaId, pelicula).subscribe(
          () => {
            alert('Película actualizada con éxito!');
            this.router.navigate(['/admin/peliculas']); // Vuelve a la lista de administración
          },
          error => {
            console.error('Error al actualizar la película:', error);
            alert('Error al actualizar la película. Revisa la consola.');
          }
        );
      } else {
        // Modo creación: llama al servicio para crear
        this.peliculaService.crearPelicula(pelicula).subscribe(
          () => {
            alert('Película creada con éxito!');
            this.router.navigate(['/admin/peliculas']); // Vuelve a la lista de administración
          },
          error => {
            console.error('Error al crear la película:', error);
            alert('Error al crear la película. Revisa la consola.');
          }
        );
      }
    } else {
      alert('Por favor, completa todos los campos requeridos y corrige los errores.');
      this.peliculaForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar validaciones
    }
  }

  // Método para volver a la lista de administración
  goBack(): void {
    this.router.navigate(['/admin/peliculas']);
  }
}
