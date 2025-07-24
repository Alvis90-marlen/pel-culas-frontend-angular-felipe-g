Prueba Técnica - Frontend de Películas (Angular)
Este repositorio contiene el frontend desarrollado con Angular para la prueba técnica de Vive Tu SAS.

Requisitos Previos
Node.js (versión 18 o superior recomendada)

npm (Node Package Manager)

Angular CLI (instalar globalmente: npm install -g @angular/cli)

Ejecución del Frontend
Asegúrate de que el backend de Spring Boot esté ejecutándose en http://localhost:8080.

Clona este repositorio: git clone https://github.com/Alvis90-marlen/prueba-t-cnica-pel-culas-frontend.git

Navega a la carpeta del proyecto: cd prueba-t-cnica-pel-culas-frontend

Instala las dependencias de Node.js: npm install

Inicia la aplicación Angular: ng serve

Abre tu navegador y ve a http://localhost:4200/peliculas.

Funcionalidades Implementadas
Área Pública (/peliculas):

Visualización de películas con todos sus detalles.

Filtro por estado: Solo se muestran las películas con estado "publicada".

Búsqueda por título: Permite buscar películas por su nombre.

Ordenamiento: Las películas pueden organizarse por puntaje, título o fecha de creación (ascendente/descendente).

Botón para navegar al área de administración.

Área Administrativa (/admin/peliculas):

Listado de todas las películas (publicadas y en edición).

Botón para "Crear Nueva Película" (/admin/peliculas/crear).

Botones para "Editar" (/admin/peliculas/editar/{id}) y "Eliminar" películas.

Formulario de creación/edición con validaciones básicas.

Notas Adicionales
Las funcionalidade