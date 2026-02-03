package api_service_manager_security.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import api_service_manager_security.model.entities.ActividadIncidencia;

public interface ActividadIncidenciaRepository extends JpaRepository<ActividadIncidencia, Integer>{

	List<ActividadIncidencia> findByIncidenciaIdTicket(int id);

}
