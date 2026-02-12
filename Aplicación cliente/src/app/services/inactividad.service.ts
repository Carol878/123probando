// inactivity.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InactividadService implements OnDestroy {
  private tiempoSinActividad = 300; // 5 minutos en segundos
  private cuentaAtras: any;
  private tiempoRestante = 0;

  //variable a la que nos suscribiremos para ver cuanto tiempo nos queda
  private tiempoRestanteSubject = new Subject<number>();

  getTiempoRestante(): Observable<number> {
    return this.tiempoRestanteSubject.asObservable();
  }

  // variable que emite cuando se detecta inactividad
  private inactividadSubject = new Subject<void>();

  getInactividadDetectada(): Observable<void> {
    return this.inactividadSubject.asObservable();
  }

  constructor() {
    this.setupActivityListeners();
  }


  private setupActivityListeners() {
    // Listamos los eventos que queremos que cuenter para reiniciar la cuenta atras
    const events = ['click', 'keydown', 'scroll'];

    // y por cada evento que hemos definido le decimos, que, si se produce alguno, reinice el tiempoSinActividad
    events.forEach(event => {
      window.addEventListener(event, () => this.resetTimer());
    });

    //Arracnamos el timer
    this.startTimer();
  }

  private startTimer(){
    //Reiniciamos el valor de tiempoRestante a 5 mins
    this.tiempoRestante = this.tiempoSinActividad;

    // Limpiar intervalo de la utlima vez
    if (this.cuentaAtras) {
      clearInterval(this.cuentaAtras);
    }

    // Crear nuevo intervalo para que cada segundo:Se reste 1 a tiempoREstante, el subject de tiempo restante emita el nuevo valor y si llega a 0 se pare el contador y se emita un valor
    this.cuentaAtras = setInterval(() => {
      this.tiempoRestante--;
      this.tiempoRestanteSubject.next(this.tiempoRestante);

      if (this.tiempoRestante <= 0) {
        this.inactividadSubject.next();
        this.stopTimer();
      }
    }, 1000);
  }

  private resetTimer() {
    this.startTimer();
  }

  // Si ha finalizado la cuentaAtras limpiamos el intervalo y vaciamos la variable
  public stopTimer(): void {
    if (this.cuentaAtras) {
      clearInterval(this.cuentaAtras);
      this.cuentaAtras = null;
    }
  }

  // Variable para modificar el tiempo que queremos que se configure para la inactividad
  public setTiempoSinActividad(seconds: number): void {
    this.tiempoSinActividad = seconds;
    this.resetTimer();
  }

  //Eliminar proceso cuando se deje de usar el servicio (que sera cuando no este logeado el usuario)
  ngOnDestroy(): void {
    this.stopTimer();

    // Remover event listeners
    const events = ['click', 'keydown', 'scroll'];
    events.forEach(event => {
      window.removeEventListener(event, () => this.resetTimer());
    });
  }
}
