Este repositorio contiene el frontend desarrollado con Angular para la prueba técnica de Vive Tu SAS.

## Requisitos Previos

* Node.js (versión 18 o superior recomendada)
* npm (Node Package Manager)
* Angular CLI (instalar globalmente: `npm install -g @angular/cli`)

## Ejecución del Frontend

1.  Asegúrate de que el backend de Spring Boot esté ejecutándose en `http://localhost:8080`.
2.  Clona este repositorio: `git clone https://github.com/Alvis90-marlen/prueba-t-cnica-pel-culas-frontend.git`
3.  Navega a la carpeta del proyecto: `cd prueba-t-cnica-pel-culas-frontend`
4.  Instala las dependencias de Node.js: `npm install`
5.  Inicia la aplicación Angular: `ng serve`
6.  Abre tu navegador y ve a `http://localhost:4200/peliculas`.

## Funcionalidades Implementadas

* **Área Pública (`/peliculas`):**
    * Visualización de películas con todos sus detalles.
    * **Filtro por estado:** Solo se muestran las películas con estado "publicada".
    * Botón para navegar al área de administración.
* **Área Administrativa (`/admin/peliculas`):**
    * Listado de todas las películas (publicadas y en edición).
    * Botón para "Crear Nueva Película" (`/admin/peliculas/crear`).
    * Botones para "Editar" (`/admin/peliculas/editar/{id}`) y "Eliminar" películas.
    * Formulario de creación/edición con validaciones básicas.

## Notas Adicionales

* Las funcionalidades de búsqueda por nombre y ordenamiento en el área pública no fueron implementadas debido a limitaciones de tiempo, pero serían los siguientes pasos a desarrollar.
* Las funcionalidades "extras" (alquiler, microservicios) no fueron implementadas.

---
