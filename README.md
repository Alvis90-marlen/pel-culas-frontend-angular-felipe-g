Este repositorio contiene el backend desarrollado con Spring Boot para la prueba técnica de Vive Tu SAS.

## Requisitos Previos

* Java Development Kit (JDK) 17 o superior
* Apache Maven (generalmente incluido con Spring Boot si usas el Wrapper)
* MySQL Database
* Un cliente MySQL (ej. MySQL Workbench, DBeaver)

## Configuración de la Base de Datos

1.  Crea una base de datos MySQL llamada `peliculasdb`.
2.  Asegúrate de que el usuario y la contraseña de tu base de datos estén configurados en `src/main/resources/application.properties`.
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/peliculasdb?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
    spring.datasource.username=tu_usuario_mysql
    spring.datasource.password=tu_contraseña_mysql
    spring.jpa.hibernate.ddl-auto=none # Importante: No recrear la tabla automáticamente
    spring.jpa.show-sql=true
    ```
3.  **Crea la tabla `peliculas` manualmente en tu base de datos MySQL.** Aquí tienes el script SQL (asegúrate de que los tipos de datos coincidan con tu `Pelicula.java`):

    ```sql
    CREATE TABLE peliculas (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        director VARCHAR(255),
        anio INT,
        genero VARCHAR(255),
        imagen VARCHAR(500),
        descripcion TEXT,
        puntaje DECIMAL(3,1),
        estado VARCHAR(50) NOT NULL,
        fecha_creacion DATETIME,
        fecha_modificacion DATETIME
    );
    ```
4.  **Opcional:** Inserta algunos datos de ejemplo si no lo hiciste a través del frontend.

## Ejecución del Backend

1.  Clona este repositorio: `git clone https://github.com/Alvis90-marlen/prueba-t-cnica-peliculas.git`
2.  Navega a la carpeta del proyecto: `cd prueba-t-cnica-peliculas`
3.  Abre el proyecto en tu IDE (IntelliJ IDEA, Visual Studio Code con extensiones Java).
4.  Ejecuta la clase principal `PeliculasApplication.java`.
5.  El backend se iniciará en `http://localhost:8080`.

## Endpoints de la API (CRUD)

* `GET /api/peliculas`: Obtener todas las películas (o filtrar por `?estado=publicada`).
* `GET /api/peliculas/{id}`: Obtener una película por ID.
* `POST /api/peliculas`: Crear una nueva película.
* `PUT /api/peliculas/{id}`: Actualizar una película existente.
* `DELETE /api/peliculas/{id}`: Eliminar una película.
