package api_service_manager_security.service;

import java.util.List;

import api_service_manager_security.model.dto.IncidenciaEntradaDto;
import api_service_manager_security.model.entities.Busqueda;
import api_service_manager_security.model.entities.Incidencia;

public interface IncidenciaService extends CrudGenerico<Incidencia, Integer>{

	Incidencia updateFromDto(IncidenciaEntradaDto dto);
	Incidencia insertFromDto(IncidenciaEntradaDto dto);
	List<Incidencia> busquedaAvanzado(Busqueda busqueda);
	
}
