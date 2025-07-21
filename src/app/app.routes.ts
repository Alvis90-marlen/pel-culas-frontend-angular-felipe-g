import { Routes } from '@angular/router';
import { PeliculasComponent } from './componentes/peliculas/peliculas.component';
import { PeliculasAdminComponent } from './componentes/peliculas-admin/peliculas-admin.component'; // Importa el nuevo componente de administración
import { PeliculaFormComponent } from './componentes/pelicula-form/pelicula-form.component'; // Importa el nuevo componente de formulario

export const routes: Routes = [
  { path: '', redirectTo: '/peliculas', pathMatch: 'full' },
  { path: 'peliculas', component: PeliculasComponent }, // Ruta para la lista pública de películas

  // Rutas para el área de administración
  { path: 'admin/peliculas', component: PeliculasAdminComponent }, // Lista de películas para administración
  { path: 'admin/peliculas/crear', component: PeliculaFormComponent }, // Formulario para crear nueva película
  { path: 'admin/peliculas/editar/:id', component: PeliculaFormComponent } // Formulario para editar película por ID
];