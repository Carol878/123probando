package api_service_manager_security.service;

import java.util.List;

import api_service_manager_security.model.entities.Grupo;

public interface GrupoService {

	List<Grupo> findAll();
	Grupo findById(int id);
	
}
