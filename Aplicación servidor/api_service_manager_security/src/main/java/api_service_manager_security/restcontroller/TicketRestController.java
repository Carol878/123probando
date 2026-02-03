package api_service_manager_security.restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api_service_manager_security.model.dto.IncidenciaEntradaDto;
import api_service_manager_security.model.entities.ATicket;
import api_service_manager_security.model.entities.ActividadIncidencia;
import api_service_manager_security.model.entities.Cambio;
import api_service_manager_security.model.entities.Incidencia;
import api_service_manager_security.model.entities.Peticion;
import api_service_manager_security.model.entities.Problema;
import api_service_manager_security.model.entities.Usuario;
import api_service_manager_security.service.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;


import java.time.LocalDate;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/tickets")
public class TicketRestController {

    private final ProblemaServiceImplMy8Jpa problemaServiceImplMy8Jpa;

	//https://stackoverflow.com/questions/54478941/persistencecontext-is-not-applicable-to-parameters-how-to-inject-entitymanager
	@PersistenceContext
	private EntityManager em;

	@Autowired
	private ProblemaService problemaService;
	@Autowired
	private IncidenciaService incidenciaService;
	@Autowired
	private PeticionService peticionService;
	@Autowired
	private CambioService cambioService;
	@Autowired
	private ActividadIncidenciaService actividadIncidenciaService;

    TicketRestController(ProblemaServiceImplMy8Jpa problemaServiceImplMy8Jpa) {
        this.problemaServiceImplMy8Jpa = problemaServiceImplMy8Jpa;
    }
	
	@PostMapping("/cambios")
    public ResponseEntity<?> crearCambio(@RequestBody Cambio cambio) {
        // Asignamos la fecha si viene vacia
		System.out.println("Llega");
        if (cambio.getFechaApertura() == null) {
            cambio.setFechaApertura( LocalDate.now());
        }
        
        // Guardamos en BBDD usando el servicio ya inyectado
        Cambio nuevoCambio = cambioService.insertOne(cambio); 
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoCambio);
    }

    // 2. Endpoint para crear INCIDENCIAS
    @PostMapping("/incidencias")
    public ResponseEntity<?> crearIncidencia(@RequestBody Incidencia incidencia) {
        if (incidencia.getFechaApertura() == null) {
            incidencia.setFechaApertura( LocalDate.now());
        }
        Incidencia nueva = incidenciaService.insertOne(incidencia);
        return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
    }

    // 3. Endpoint para PETICIONES
    @PostMapping("/peticiones")
    public ResponseEntity<?> crearPeticion(@RequestBody Peticion peticion) {
        if (peticion.getFechaApertura() == null) {
            peticion.setFechaApertura( LocalDate.now());
        }
        Peticion nueva = peticionService.insertOne(peticion);
        return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
    }
    
    // 4. Endpoint para PROBLEMAS
    @PostMapping("/problemas")
    public ResponseEntity<?> crearProblema(@RequestBody Problema problema) {
        if (problema.getFechaApertura() == null) {
            problema.setFechaApertura( LocalDate.now());
        }
        Problema nuevo = problemaService.insertOne(problema);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

	@GetMapping("/all")
	ResponseEntity<?> problemasTodos() {

		List<Problema> problemas = problemaService.findAll();
		//para que nos limpie la memoria y no haya problema con los id en memoria
		em.clear();
		List<Incidencia> incidencias = incidenciaService.findAll();
		em.clear();
		List<Peticion> peticiones = peticionService.findAll();
		em.clear();
		List<Cambio> cambios = cambioService.findAll();
		List<ATicket> tickets = new ArrayList<>(problemas);
		tickets.addAll(incidencias);
		tickets.addAll(peticiones);
		tickets.addAll(cambios);

		for (ATicket ticket:tickets) {
			ticket.getAbiertoPor().setPassword(null);
			if (ticket.getAsignatario() != null) {
				ticket.getAsignatario().setPassword(null);
			}
		}


		return ResponseEntity.ok(tickets);

	}



	@PutMapping("/incidencias/actualizar-uno")
	public ResponseEntity<?> actualizarUno(@RequestBody IncidenciaEntradaDto dto) {
		Incidencia actualizada = incidenciaService.updateFromDto(dto);
		return ResponseEntity.ok(actualizada);
	}
	
	
	@GetMapping("/incidencias/actividades")
	ResponseEntity<?> todasActividadesIncidencia() {
		List<ActividadIncidencia> lista= actividadIncidenciaService.findAll();
		for (ActividadIncidencia actividad:lista) {
			actividad.getAutor().setPassword(null);
		}
		return ResponseEntity.ok(lista);
	}
	
	@GetMapping("/incidencias/{idIncidencia}/actividades")
	ResponseEntity<?> todasActividadesUnaIncidencia(@PathVariable int idIncidencia) {
		List<ActividadIncidencia> lista= actividadIncidenciaService.findByIdIncidencia(idIncidencia);
		for (ActividadIncidencia actividad:lista) {
			actividad.getAutor().setPassword(null);
		}
		return ResponseEntity.ok(lista);
	}



	}
