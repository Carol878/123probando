import { Component, inject, output, ViewEncapsulation } from '@angular/core';
import { EnlaceSeguroDirective } from './enlace-seguro.directive';
import { TicketsService } from '../../services/tickets.service';
import { AppService } from '../../services/app.service';

// Decoramos la clase para que sea un componente.
@Component({
  selector: 'app-encabezado',
  standalone:true,
  // Importamos la directiva que va a utilizar la imagen.
  imports: [EnlaceSeguroDirective], 
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css',
  // Hacemos host binding en el decorador para indicar que todas las veces que se referencie este componente llevara implicita la clase CSS "encabezado".
  host: {
    class: "encabezado",
  }
})
export class EncabezadoComponent {
  // Inyectamos nuestro servicio y le pasamos el token TicketsService y se va a ir a buscarlo al arbol de inyecciones.
  private ticketsService = inject(TicketsService)

  //Inyectamos nuestro servicio app para gestionar el login
    private appService = inject(AppService);
    
  cambiarTicketVisible(){
    this.ticketsService.mostrarTickets();
    this.ticketsService.cambiarTicketVisible("todos");
    
  }

  cerrarSesion() {
    const confirmar = confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (confirmar) {
      console.log("Cerrando sesión...");
      this.appService.setLogeado(false);
      this.appService.setIntentoFallido(false);
    }
  }
}
