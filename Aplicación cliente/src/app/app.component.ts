import { Component, inject, signal } from '@angular/core';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { funcionesPrincipales } from '../funciones-principales';
import { FuncionesComponent } from './components/funciones/funciones.component';
import { CuerpoComponent } from './components/cuerpo/cuerpo.component';
import { type Funcion } from './components/funciones/funcion.model';
import { AppService } from './services/app.service';
import { PanelLoginComponent } from './components/panel-login/panel-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EncabezadoComponent, FuncionesComponent, CuerpoComponent, PanelLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  //Inyectamos nuestro servicio app para gestionar el login
  private appService = inject(AppService);

  //Definimos logeado en funcion de lo que haya en el appService
  logeado = this.appService.getLogeado();

  //Array de funciones principales para mostrar los botones de las categorias y las aprobaciones
  funciones: Funcion[] = funcionesPrincipales;

  //Variable que define si el aside esta o no desplegado
  asideDesplegado = signal<boolean>(true);

  //Funcion para plegar el menu lateral
  plegarAside() {
    this.asideDesplegado.set(false);
  }
  //Funcion para desplegar el menu lateral
  desplegarAside() {
    this.asideDesplegado.set(true);
  }
}
