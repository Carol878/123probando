package api_service_manager_security.service;

import api_service_manager_security.model.dto.IncidenciaEntradaDto;
import api_service_manager_security.model.entities.Incidencia;

public interface IncidenciaService extends CrudGenerico<Incidencia, Integer>{

	Incidencia updateFromDto(IncidenciaEntradaDto dto);
	
}
