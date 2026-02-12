import { Directive, HostListener, Input } from '@angular/core';
import * as Papa from 'papaparse';
import { Ticket } from './tickets/ticket.model';


@Directive({
  selector: 'button[appExport]'
})
export class ExportDirective {

  //Datos que va a recibir
  @Input() valores:Ticket[]= [];

  //Nombre del CSV a descargar
  private NOMBRE_FICHERO = 'export.csv';

  //que el boton al que se asigne la directiva escuche el click
  @HostListener('click')
  onClick() {
    this.exportarTicketsEnCSV();
  }

  private exportarTicketsEnCSV() {

    // Por si en algun momento queremos que salte un mensaje, de momento que se descargue vacío
    // if (!this.valores || this.valores.length === 0) {
    //   console.warn('No hay datos para exportar');
    //   return;
    // }

    //Extraemos los objetos de los objetos
    //MOSTRARA TODO EL TICKETS CON TODOS LOS DATOS 
    const datosFinales = this.objetosEnClaro(this.valores);

    // Elegimos la configuración con la que queremos el CSV y creamos un objeto con la libreía papaparse
     const csv = Papa.unparse(datosFinales, {
      delimiter: ';', //separa por ;
      header: true, // coje los nombre de los atributos de las clases
      quotes: true, // Poner comillas a los string
      skipEmptyLines: true,
    });

    // Descargar el archivo
    this.descargarArchivo(csv);
  }

  private objetosEnClaro(objetos: any[]): any[] {
    return objetos.map(obj => this.objetoEnClaro(obj));
  }

  private objetoEnClaro(obj: any, prefijo: string = ''): any {
    const resultado: any = {};

    Object.keys(obj).forEach(key => {
      const valor = obj[key];
      const nuevaKey = prefijo ? `${prefijo}.${key}` : key;

      if (valor && typeof valor === 'object' && !Array.isArray(valor) && !(valor instanceof Date)) {
        // Si es objeto, sacamos los atributos
        Object.assign(resultado, this.objetoEnClaro(valor, nuevaKey));
      } else if (valor instanceof Date) {
        // Formatear fechas
        resultado[nuevaKey] = valor.toISOString().split('T')[0];
      } else if (Array.isArray(valor)) {
        // Si es array, convertirlo a string
        resultado[nuevaKey] = valor.join(', ');
      } else {
        //Si es un atributo normal lo devolvemos tal cual.
        resultado[nuevaKey] = valor;
      }
    });

    return resultado;
  }

  private descargarArchivo(contenidoDelCSV: string) {
    //Le metemos el tipo de alfabeto y el \uFEFF para las tildes
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + contenidoDelCSV], {
      type: 'text/csv;charset=utf-8;'
    });

    //Le decimos al navegador que cree el documento con los datos
    const url = window.URL.createObjectURL(blob);
    //Creamos el link de descarga HTML
    const link = document.createElement('a');
    //Le configramos la URL de descarga que es el fichero del paso anterior
    link.href = url;
    //Le decimos que se descargue el documento cuando alguien pinche en el link
    link.download = this.NOMBRE_FICHERO;
    //Y hacemos que se limpie
    link.click();

    //Por ultimo eliminamos el documento csv de la cache del navegador
    window.URL.revokeObjectURL(url);
  }




}
