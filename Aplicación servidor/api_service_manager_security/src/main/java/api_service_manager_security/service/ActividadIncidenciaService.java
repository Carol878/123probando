package api_service_manager_security.service;

import java.util.List;

import api_service_manager_security.model.entities.ActividadIncidencia;

public interface ActividadIncidenciaService extends CrudGenerico<ActividadIncidencia, Integer>{

	List<ActividadIncidencia> findByIdIncidencia(int id);
	
}
