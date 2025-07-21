    import { bootstrapApplication } from '@angular/platform-browser'; // Importa bootstrapApplication
    import { appConfig } from './app/app.config'; // Importa tu configuración de la aplicación
    import { AppComponent } from './app/app.component'; // Asegúrate de que AppComponent esté importado

    bootstrapApplication(AppComponent, appConfig) // Usa bootstrapApplication
      .catch((err) => console.error(err));
    