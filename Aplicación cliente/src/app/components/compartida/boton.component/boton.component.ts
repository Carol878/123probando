import { Component, ViewEncapsulation } from '@angular/core';

//Decoramos el componente como un COMPONENTE.
@Component({
  //Configuramos el selector para que se aplique a los elementos HTML tipo <button> que configuren en sus parametros el atributo appButton como hicimos con la directiva pero esta vez con una plantilla .
  selector: 'button[appButton]',
  standalone: true,
  imports: [],
  templateUrl: './boton.component.html',
  styleUrl: './boton.component.css',
})
export class BotonComponent {

}
