package api_service_manager_security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api_service_manager_security.model.entities.Grupo;
import api_service_manager_security.model.repository.GrupoRepository;

@Service
public class GrupoServiceImplMy8Jpa implements GrupoService{


	@Autowired
	private GrupoRepository grupoRepository;

	@Override
	public List<Grupo> findAll() {
		
		return grupoRepository.findAll();
	}

	@Override
	public Grupo findById(int id) {
		return grupoRepository.findById(id).orElse(null);
	}
	
}
