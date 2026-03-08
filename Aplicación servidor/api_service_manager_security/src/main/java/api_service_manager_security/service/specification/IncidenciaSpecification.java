package api_service_manager_security.service.specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import api_service_manager_security.model.entities.Busqueda;
import api_service_manager_security.model.entities.Incidencia;
import jakarta.persistence.criteria.*;

@Component
public class IncidenciaSpecification {
    
	//Creamos un metodo que va a devolver las "reglas de busqueda" para las incidencias que previamente habremos construido pasandole 
	//los criterios definidos en el flornted
	
    public Specification<Incidencia> filtrarPorBusqueda(Busqueda busqueda) {
    	
    	//Devolvemos el resultado de una funcion lamda que recibe como parametros la tabla de incidencias(root), la consulta que se va a contruir (query),
    	//y los criterios de busqeuda (cb)
    	
        return (Root<Incidencia> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
        	//Creamos una lista de Predicados, que son básicamente objetos con un variables booleanas con el nombre de la condicion
        	//Seria como el where en sql
            List<Predicate> predicados = new ArrayList<>();
            
            // Buscamos la cadena introducida en todos los campos de texto de la incidencia
            // Si texto es vacio, o solo tiene espacios no realizamos nnguna búsqueda
            if (busqueda.getTexto() != null && !busqueda.getTexto().trim().isEmpty()) {
            	
            	//Creamos una variables con los porcentajes para inyectarlo en la query de JPQL
            	
                String textoBusqueda = "%" + busqueda.getTexto().toLowerCase() + "%";
                
                //Y ahora le decimos que cree un predicado tituloMatch con el contenido "si el titulo contiene"
                //Es decir esto "root.get("titulo")), textoBusqueda" seria como "where titulo like %cadena%" que devuelve true o false para cada incidencia
                //Usamos cb.like para que busque cadenas como hariamos en BBDD y lower para que coincida con el textoBusqueda, que previamente hemos puesto lower.
                
                
                Predicate tituloMatch = cb.like(
                    cb.lower(root.get("titulo")), textoBusqueda);
                
                Predicate descripcionMatch = cb.like(
                    cb.lower(root.get("descripcion")), textoBusqueda);
                
                Predicate comentarioMatch = cb.like(
                    cb.lower(root.get("comentarioCierre")), textoBusqueda);
                
                
                //Ahora le decimos que combine estos patrones y lo añada a la lista de predicados final.
                //Seria como: titulo like %cadena%" OR descripcion like %cadena%" OR comentarioCierre like %cadena%"
                //Por lo tanto cuando le pasemos las specificaciones al findAll solo sacara las incidencias que cumplan con los predicados que hemos definido.
                predicados.add(cb.or(tituloMatch, descripcionMatch, comentarioMatch));
            }
            
            // Misma logica para ticket
            if (busqueda.getIdTicket() != null && !busqueda.getIdTicket().trim().isEmpty()) {
            	//el cb equals es el =
                predicados.add(cb.equal(root.get("codigoTicket"), busqueda.getIdTicket()));
            }
            
            //  Misma logica para abiertoPor
            if (busqueda.getAbiertoPor() != null && !busqueda.getAbiertoPor().trim().isEmpty()) {
                predicados.add(cb.equal(
                    root.get("abiertoPor").get("username"), 
                    busqueda.getAbiertoPor()
                ));
            }
            
            // Misma logica para Areas
            if (busqueda.getAreaAfectada() != null && !busqueda.getAreaAfectada().trim().isEmpty()) {
                predicados.add(cb.equal(
                    root.get("areaAfectada"), 
                    busqueda.getAreaAfectada()
                ));
            }
            
            // La logica para esto varia un poco, como no hemos definido en el frontend "abierto antes de" ni "abierto despues de" pues buscamos por fechas
            //sin contar las horas
            if (busqueda.getFechaApertura() != null) {
            	//Al hacer esto que mencionamos arriba tenemos que quitarle la hora a la fecha que era LocalDateTime por eso le pasamos la funcion DATE,
            	//y le decimos que lo meta en clase LocalDate
            	//QUe ocurre, que esa funcion devuelve un obj especial que es expression por lo tanto hay que almacenar en un objeto expresion 
            	//y decirle que lo que hay gaurdado es un LocalDate
                Expression<LocalDate> fechaApertura = cb.function(
                    "DATE", LocalDate.class, root.get("fechaApertura"));
                predicados.add(cb.equal(fechaApertura, busqueda.getFechaApertura()));
            }
            
            if (busqueda.getFechaCierre() != null) {
                Expression<LocalDate> fechaCierre = cb.function(
                    "DATE", LocalDate.class, root.get("fechaCierre"));
                predicados.add(cb.equal(fechaCierre, busqueda.getFechaCierre()));
            }
            
            if (busqueda.getFechaLimite() != null) {
                Expression<LocalDate> fechaLimite = cb.function(
                    "DATE", LocalDate.class, root.get("fechaLimite"));
                predicados.add(cb.equal(fechaLimite, busqueda.getFechaLimite()));
            }
            
            // Misma logica para grupo
            if (busqueda.getGrupo() != null && busqueda.getGrupo() > 0) {
                predicados.add(cb.equal(
                    root.get("grupo").get("idGrupo"), 
                    busqueda.getGrupo()
                ));
            }
            
            // Misma logica para prioridad
            if (busqueda.getPrioridad() != null && !busqueda.getPrioridad().trim().isEmpty()) {
                predicados.add(cb.equal(
                    root.get("prioridad"), 
                    busqueda.getPrioridad()
                ));
            }
            
            // Misma logica para estado
            if (busqueda.getEstado() != null && !busqueda.getEstado().trim().isEmpty()) {
                predicados.add(cb.equal(
                    root.get("estado"), 
                    busqueda.getEstado()
                ));
            }
            
            // Misma logica para tipoCIerre
            if (busqueda.getTipoCierre() != null && !busqueda.getTipoCierre().trim().isEmpty()) {
                predicados.add(cb.equal(
                    root.get("tipoCierre"), 
                    busqueda.getTipoCierre()
                ));
            }
            
            // Si no hay filtros
            if (predicados.isEmpty()) {
                return cb.conjunction();  // Devuelve todo y ya
                //  cb.conjunction() siempre va a ser true pero no se puede poner true porque un Specification siempre debe devolver un predicate
                // Es como un predicate "en blanco"
            }
            
            // Esto lo que hace es una funcion lamda que va a unir con un "Y" todos los predicados que hemos ido añadiendo desde la posición 0
            
           // WHERE estado = 'ABIERTA' AND prioridad > 3 AND fecha = '2026-02-14'
            return cb.and(predicados.toArray(new Predicate[0]));
        };
    }
}