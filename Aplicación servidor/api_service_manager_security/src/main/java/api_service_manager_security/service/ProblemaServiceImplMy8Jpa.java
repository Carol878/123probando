package api_service_manager_security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api_service_manager_security.model.entities.Problema;
import api_service_manager_security.model.repository.ProblemaRepository;

@Service
public class ProblemaServiceImplMy8Jpa implements ProblemaService{

	@Autowired
	private ProblemaRepository problemaRepository;

	@Override
	public List<Problema> findAll() {
		return problemaRepository.findAll();
	}

	@Override
	public Problema findById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Problema insertOne(Problema obj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Problema updateOne(Problema obj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int deleteById(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	
	
	
}
