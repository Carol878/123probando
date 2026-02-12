package api_service_manager_security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api_service_manager_security.model.dto.IncidenciaEntradaDto;
import api_service_manager_security.model.entities.Incidencia;
import api_service_manager_security.model.repository.GrupoRepository;
import api_service_manager_security.model.repository.IncidenciaRepository;
import api_service_manager_security.model.repository.UsuarioRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class IncidenciaServiceImplMy8Jpa implements IncidenciaService{

	@Autowired
	private IncidenciaRepository incidenciaRepository;
    @Autowired 
    private UsuarioRepository usuarioRepository;
    @Autowired 
    private GrupoRepository grupoRepository;
    @Autowired
    private EntityManager entityManager;


	@Override
	public List<Incidencia> findAll() {
		return incidenciaRepository.findAll();
	}

	@Override
	public Incidencia findById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Incidencia insertOne(Incidencia obj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Incidencia updateOne(Incidencia obj) {
		
		return null;
	}

	@Override
	public int deleteById(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}


@Override
    public Incidencia updateFromDto(IncidenciaEntradaDto dto) {
        Incidencia existente = incidenciaRepository.findById(dto.getIdTicket()).orElse(null);

        // Campos simples
        existente.setTitulo(dto.getTitulo());
        existente.setDescripcion(dto.getDescripcion());
        existente.setEstado(dto.getEstado());
        existente.setAreaAfectada(dto.getAreaAfectada());
        existente.setComentarioCierre(dto.getComentarioCierre());
        existente.setTipoCierre(dto.getTipoCierre());
        existente.setPrioridad(dto.getPrioridad());
        existente.setCodigoTicket(dto.getCodigoTicket());
        existente.setFechaApertura(dto.getFechaApertura());
        existente.setFechaCierre(dto.getFechaCierre());
        existente.setFechaLimite(dto.getFechaLimite());

        // Rehidratación de relaciones vía repos
        if (dto.getAsignatarioUsername() != null) {
            existente.setAsignatario(
                usuarioRepository.findById(dto.getAsignatarioUsername()).orElse(null));
        } else {
            existente.setAsignatario(null);
        }

        if (dto.getAbiertoPorUsername() != null) {
            existente.setAbiertoPor(
                usuarioRepository.findById(dto.getAbiertoPorUsername()).orElse(null));
        }

        if (dto.getGrupoId() != null) {
            existente.setGrupo(
                grupoRepository.findById(dto.getGrupoId()).orElse(null));
        }
        // Persistir
        return incidenciaRepository.save(existente);
    }

@Transactional
@Override
public Incidencia insertFromDto(IncidenciaEntradaDto dto) {
	Incidencia nueva = new Incidencia();

    // Campos simples
	nueva.setTitulo(dto.getTitulo());
	nueva.setCategoriaTicket(dto.getCategoriaTicket());
	nueva.setDescripcion(dto.getDescripcion());
	nueva.setEstado(dto.getEstado());
	nueva.setAreaAfectada(dto.getAreaAfectada());
	nueva.setComentarioCierre(dto.getComentarioCierre());
	nueva.setTipoCierre(dto.getTipoCierre());
	nueva.setPrioridad(dto.getPrioridad());
    nueva.setCodigoTicket(dto.getCodigoTicket());
    nueva.setFechaApertura(dto.getFechaApertura());
    nueva.setFechaCierre(dto.getFechaCierre());
    nueva.setFechaLimite(dto.getFechaLimite());

    // Rehidratación de relaciones vía repos
    if (dto.getAsignatarioUsername() != null) {
    	nueva.setAsignatario(
            usuarioRepository.findById(dto.getAsignatarioUsername()).orElse(null));
    } else {
    	nueva.setAsignatario(null);
    }

    if (dto.getAbiertoPorUsername() != null) {
    	nueva.setAbiertoPor(
            usuarioRepository.findById(dto.getAbiertoPorUsername()).orElse(null));
    }

    if (dto.getGrupoId() != null) {
    	nueva.setGrupo(
            grupoRepository.findById(dto.getGrupoId()).orElse(null));
    }
    // Persistimos
    Incidencia ticket = incidenciaRepository.save(nueva);
    //Actualizamos lo que acabamos de recibir para que recoja el valor codigo_ticket que se genera con el before insert
    entityManager.refresh(ticket);
    
    return ticket;
}

	
	
	
	
}
