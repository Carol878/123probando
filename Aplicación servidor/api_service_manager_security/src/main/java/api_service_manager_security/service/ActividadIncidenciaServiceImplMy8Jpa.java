package api_service_manager_security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api_service_manager_security.model.entities.ActividadIncidencia;
import api_service_manager_security.model.repository.ActividadIncidenciaRepository;
@Service
public class ActividadIncidenciaServiceImplMy8Jpa implements ActividadIncidenciaService{

	@Autowired
	private ActividadIncidenciaRepository actividadIncidenciaRepository;
	
	@Override
	public List<ActividadIncidencia> findAll() {
		return actividadIncidenciaRepository.findAll();
	}

	@Override
	public ActividadIncidencia findById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ActividadIncidencia insertOne(ActividadIncidencia obj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ActividadIncidencia updateOne(ActividadIncidencia obj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int deleteById(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<ActividadIncidencia> findByIdIncidencia(int id) {
		return actividadIncidenciaRepository.findByIncidenciaIdTicket(id);
	}
	

}
