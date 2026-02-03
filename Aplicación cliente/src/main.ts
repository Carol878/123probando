import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
// Importamos clases para cambiar el idiomo predeterminado de nuestra página a Español
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

//Registramos nuestro región España como "es"
registerLocaleData(localeEs, 'es');

//Configuramos en el arranque que use el proveedor LOCALE_ID como la variable que hemos creado antes "es"
bootstrapApplication(AppComponent, {
    providers:[provideHttpClient(),{
        provide: LOCALE_ID,
        useValue: "es"
        },
        //Para animaciones más suaves
        provideAnimations(),]
}).catch((err) => console.error(err));
