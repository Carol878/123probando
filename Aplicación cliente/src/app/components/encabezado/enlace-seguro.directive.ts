import { Directive, ElementRef, inject } from '@angular/core';

// Decoramos el componente como una directiva.
@Directive({
  //Configuramos el selector para que se aplique a los elementos HTML tipo <a> (anchor o anclaje) que configuren en sus parametros el atributo appEnlaceSeguro.
  selector: 'a[appEnlaceSeguro]',
  standalone: true,
  // Configuramos un host listener en el decorador que hace que todos los componenetes que implementen la directiva escuchen el click. Como si lo tuviesen configurado en la plantilla HTML.
  host: {
    '(click)': 'alClickar($event)',
  },
})
export class EnlaceSeguroDirective {
  // Injectamos el anchor que corresponda como dependencia para poder trabajar con el. Se comenta por si en el futuro fuese necesario.
  // private referenciaAlAnclaje = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  // Definimos la funcion a la que llama el evento que hemos configurado en el decorador. Recibimos el evento para poder decidir si queremos que se produzca o no
  alClickar(event: MouseEvent) {
    // Creamos una ventana emergente que muestre un mensaje y pida confirmación
    const salir = window.confirm(
      'Estas saliendo de la aplicación a un sitio externo. ¿Desea continuar?'
    );
    // En base a si se pulsa cancelar o confirmar se continuara con el evento (return) o se prevendra el comportamiento habitual (event.preventDefault()) que sería salirse del sitio.
    if (salir) {
      return;
    } else {
      event.preventDefault();
    }
  }
}
