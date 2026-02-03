package api_service_manager_security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api_service_manager_security.model.dto.IncidenciaEntradaDto;
import api_service_manager_security.model.entities.Incidencia;
import api_service_manager_security.model.repository.GrupoRepository;
import api_service_manager_security.model.repository.IncidenciaRepository;
import api_service_manager_security.model.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class IncidenciaServiceImplMy8Jpa implements IncidenciaService{

	@Autowired
	private IncidenciaRepository incidenciaRepository;
    @Autowired 
    private UsuarioRepository usuarioRepository;
    @Autowired 
    private GrupoRepository grupoRepository;


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

	
	
	
	
}
