package api_service_manager_security.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import api_service_manager_security.model.entities.Incidencia;

//extendemos de la interfaz specification para realizar busqeudas avanzadas

public interface IncidenciaRepository extends JpaRepository<Incidencia, Integer>, JpaSpecificationExecutor<Incidencia>  {

}
