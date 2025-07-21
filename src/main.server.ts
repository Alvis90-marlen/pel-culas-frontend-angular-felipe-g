import { enableProdMode } from '@angular/core';
    import { bootstrapApplication } from '@angular/platform-browser'; // Importa bootstrapApplication
    import { AppComponent } from './app/app.component'; // Asegúrate de que AppComponent esté importado
    import { appConfig } from './app/app.config'; // Importa tu configuración de la aplicación

    // Esto es para el renderizado del lado del servidor (SSR)
    // No necesitas modificar mucho aquí, solo asegurar que use bootstrapApplication
    const bootstrap = () => bootstrapApplication(AppComponent, appConfig);

    export default bootstrap;
    