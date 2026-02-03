package api_service_manager_security.service;

import java.util.List;

import api_service_manager_security.model.dto.UsuarioSalidaDto;
import api_service_manager_security.model.entities.Grupo;
import api_service_manager_security.model.entities.Usuario;

public interface UsuarioService {
	UsuarioSalidaDto findByIdDto(String username);
	Usuario findById(String username);
	Usuario findByUsernameAndPassword(String username, String password);
	Usuario insertOne(Usuario usuario);
	List<UsuarioSalidaDto> findAllDeGrupo(Grupo grupo);
	List<Usuario> findAll();
}
