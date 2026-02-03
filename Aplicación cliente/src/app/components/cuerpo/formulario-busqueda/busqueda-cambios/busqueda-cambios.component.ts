import { Component, inject } from '@angular/core';
import { TicketsService } from '../../../../services/tickets.service';
import { BotonComponent } from '../../../compartida/boton.component/boton.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-busqueda-cambios',
  imports: [BotonComponent,ReactiveFormsModule, TitleCasePipe],
  templateUrl: './busqueda-cambios.component.html',
  styleUrl: './busqueda-cambios.component.css',
})
export class BusquedaCambiosComponent {
 // Inyectamos nuestro servicio y le pasamos el token TicketsService y se va a ir a buscarlo al arbol de inyecciones.
  private ticketsService = inject(TicketsService);
 
    private fb = inject(FormBuilder);
  
  // Declaramos searchForm que sera de tipo FormGroup. El ! indica que se llenara luego.
  searchForm!: FormGroup;
  
  //Datos para los desplegables:
  categorias = ['Cambios', 'Peticiones', 'Incidencias', 'Problemas'];
  prioridades = ['Baja', 'Media', 'Alta', 'Crítica'];
  
  // Inicializamos (ngOnInit se ejecuta al cargar el componente)
  ngOnInit(){
    //Usamos fb para crear grupo de controles
    this.searchForm = this.fb.group({
      //Cada campo empieza vacio
      categoria: [''],
      prioridad: [''],
      titulo: [''],
      areaAfectada: ['']
    });
  
    //Escucha activa: cada vez que cambie cualquier valor del formulario se ejecuta la busqueda automaticamente.
    this.searchForm.valueChanges.subscribe(valores => {
        this.ejecutarBusqueda(valores);
      });
  }
  
  // Función que se ejecuta cada vez que el usuario escribe
  
  ejecutarBusqueda(filtros: any) {
    // Le pasamos el objeto con los filtros al metodo que crearemos en el servicio.
    this.ticketsService.filtrarTickets(filtros);
    console.log('Buscando con estos filtros: ', filtros)
  }
  
  // Reseteo de los filtros: borra todo lo escrito y vuelve a los valores iniciales
  limpiarFiltros() {
      this.searchForm.reset({
        categoria: '',
        prioridad: '',
        titulo: '',
        areaAfectada: ''
      });
    }
  
  
  //Con el boton de calcelar volvemos a mostrar tickets
    alCancelar() {
      this.ticketsService.mostrarTickets();
    }
    
  }
  
