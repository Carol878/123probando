package api_service_manager_security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api_service_manager_security.model.entities.Cambio;
import api_service_manager_security.model.repository.CambioRepository;

@Service
public class CambioServiceImplMy8Jpa implements CambioService{

	@Autowired
	private CambioRepository cambioRepository;

	@Override
	public List<Cambio> findAll() {
		return cambioRepository.findAll();
	}

	@Override
	public Cambio findById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Cambio insertOne(Cambio obj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Cambio updateOne(Cambio obj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int deleteById(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	
	
	
}
