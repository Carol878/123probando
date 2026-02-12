package api_service_manager_security.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api_service_manager_security.model.dto.ActividadIncidenciaEntradaDto;
import api_service_manager_security.model.entities.ActividadIncidencia;
import api_service_manager_security.model.entities.Incidencia;
import api_service_manager_security.model.entities.Usuario;
import api_service_manager_security.model.repository.ActividadIncidenciaRepository;
import api_service_manager_security.model.repository.IncidenciaRepository;
import api_service_manager_security.model.repository.UsuarioRepository;
@Service
public class ActividadIncidenciaServiceImplMy8Jpa implements ActividadIncidenciaService{

	@Autowired
	private ActividadIncidenciaRepository actividadIncidenciaRepository;
	@Autowired
	private IncidenciaRepository incidenciaRepository;
    @Autowired 
    private UsuarioRepository usuarioRepository;
	
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
		try {
			return actividadIncidenciaRepository.save(obj);
		}
		catch (Exception e) {
			return null;
		}
		
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

	@Override
    public ActividadIncidencia insertFromDto(ActividadIncidenciaEntradaDto dto) {
        Incidencia incidencia = incidenciaRepository.findById(dto.getIdTicket()).orElse(null);

        Usuario autor = usuarioRepository.findById(dto.getAutor()).orElse(null);
        
        ActividadIncidencia entidad = new ActividadIncidencia();
        entidad.setIncidencia(incidencia);
        entidad.setAutor(autor);
        entidad.setComentario(dto.getComentario());

        
        entidad.setFechaComentario(LocalDateTime.now());
        

        
        return actividadIncidenciaRepository.save(entidad);
    

	}
	

}
