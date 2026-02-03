import { Pipe, PipeTransform } from '@angular/core';

//Vamos a crear un pipe personalizado para que las filas se muestre más finas acortando el texto largo
//Decoramos con @Pipe y definimos el nombre que queremos luego usar.
@Pipe({
  name: 'truncar',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  // Implementamos transform que es obligatorio y le ponemos que cuando se le llame va a recibir si o si un string y de manera opciona un número de caracteres si no se indica nada serán 50.
  transform(value: string, numCaracteres: number = 50) {
    //Si value no esta declarada devolvemos "".
    if (!value) {
      return '';
    }
    //Si la longitud no supera el numero de caracteres especificado devolvemos el valor integro.
    if (value.length <= numCaracteres) {
      return value;
    }

    // Si no se cumple ninguno de estos, devolvemos una cadena del texto original.
    return value.substring(0,numCaracteres)+"...";
  }
}
