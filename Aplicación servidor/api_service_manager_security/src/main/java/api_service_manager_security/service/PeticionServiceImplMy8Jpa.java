package api_service_manager_security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api_service_manager_security.model.entities.Peticion;
import api_service_manager_security.model.repository.PeticionRepository;

@Service
public class PeticionServiceImplMy8Jpa implements PeticionService{

	@Autowired
	private PeticionRepository peticionRepository;

	@Override
	public List<Peticion> findAll() {
		return peticionRepository.findAll();
	}

	@Override
	public Peticion findById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Peticion insertOne(Peticion obj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Peticion updateOne(Peticion obj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int deleteById(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	
	
	
}
