import { Component, effect, inject, signal } from '@angular/core';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { funcionesPrincipales } from '../funciones-principales';
import { FuncionesComponent } from './components/funciones/funciones.component';
import { CuerpoComponent } from './components/cuerpo/cuerpo.component';
import { type Funcion } from './components/funciones/funcion.model';
import { AppService } from './services/app.service';
import { PanelLoginComponent } from './components/panel-login/panel-login.component';
import { Subscription } from 'rxjs';
import { InactividadService } from './services/inactividad.service';
import { BotonComponent } from './components/compartida/boton.component/boton.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EncabezadoComponent, FuncionesComponent, CuerpoComponent, PanelLoginComponent, BotonComponent],
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

  //Vamos a añadir la logica para el cierre de sesión automatica por inactividad:

  //El primer paso es definir las varible que necesitaremos:
  inactividadService = inject(InactividadService);
  tiempoRestante = signal<number>(300); // 5 minutos iniciales
  mostrarAdvertencia = signal<boolean>(false);
  private subscripcion = new Subscription();

  //Creamos un effect que va a crear ima constante con el signal de si esta o no logeado y cuando sea true ejecutar el inciiado del contrado y cuando sea false lo parara y reseteara
  private loginEffect = effect(() => {
    const estaLogeado = this.logeado();
    console.log('estaLogeado: tiene un valor de: ', estaLogeado);

    if (estaLogeado) {
      this.iniciarMonitorizacionInactividad();
      console.log('Iniciar contador');
    } else {
      this.detenerMonitorizacionInactividad();
      console.log('Parar contador');
    }
  });

  private iniciarMonitorizacionInactividad() {
    this.inactividadService.setTiempoSinActividad(600);
    this.tiempoRestante.set(600);

    //nos subscrimibos al tiempo restante que emitimos en el servicio y actualizamos nuestro valor tiempo restante
    this.subscripcion.add(
      this.inactividadService.getTiempoRestante().subscribe((tiempo) => {
        this.tiempoRestante.set(tiempo);
        //ahora usamos un valor dinamico en funcion del tiempo para hacer que mostarAdvertencia aparezca o no
        this.mostrarAdvertencia.set(tiempo < 180 && tiempo > 0);
        console.log('tiempo restante hasta el cierre de sesión por inactividad: ', tiempo);
      }),
    );

    //vamos a añadir una subscripcion que si recibe un valor llame la funcion que cierra la sesión
    this.subscripcion.add(
      this.inactividadService.getInactividadDetectada().subscribe(() => {
        console.log('Cerrando sesión por inactividad');

        this.cerrarSesionPorInactividad();
      }),
    );
  }

  private detenerMonitorizacionInactividad() {
    //nos desubscribimos de todo
    this.subscripcion.unsubscribe();
    //Instanciamos una nueva subscripcion
    this.subscripcion = new Subscription();
    //Paramos el contador que recordemos que vacia la cuenta atras
    this.inactividadService.stopTimer();
    //quitamos la advertencia si habia
    this.mostrarAdvertencia.set(false);
    //reiniciamos el tiempo en nuestro componente
    this.tiempoRestante.set(600);
  }

  extenderSesion() {
    //reiniciamos el tiempo
    this.inactividadService.setTiempoSinActividad(600);
    //borramos el mensaje
    this.mostrarAdvertencia.set(false);
    console.log('Sesión extendida');
  }

  cerrarSesionPorInactividad() {
    // Usar el AppService para cerrar sesión
    this.appService.setLogeado(false);
    this.appService.setUsuarioValido(undefined!);
    this.appService.setUsername('');
    this.appService.setPassword('');

    this.detenerMonitorizacionInactividad();
  }

  cerrarSesion() {
    // Usar el AppService para cerrar sesión
    this.appService.setLogeado(false);
    this.appService.setUsuarioValido(undefined!);
    this.appService.setUsername('');
    this.appService.setPassword('');

    this.detenerMonitorizacionInactividad();
  }


}
