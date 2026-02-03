package api_service_manager_security.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import api_service_manager_security.model.dto.UsuarioSalidaDto;
import api_service_manager_security.model.entities.Grupo;
import api_service_manager_security.model.entities.Usuario;
import api_service_manager_security.model.repository.UsuarioRepository;

@Service
public class UsuarioServiceImplMy8Jpa implements UsuarioService, UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		return usuarioRepository.findById(username).orElse(null);
	}

	@Override
	public UsuarioSalidaDto findByIdDto(String username) {
		return UsuarioSalidaDto.crearUsuarioSalidaDtoDesdeUsuario(usuarioRepository.findById(username).orElse(null));
	}

	@Override
	public Usuario findByUsernameAndPassword(String username, String password) {
		return usuarioRepository.findByUsernameAndPassword(username, password);
	}

	@Override
	public Usuario insertOne(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}
	

	@Override
	public List<UsuarioSalidaDto> findAllDeGrupo(Grupo grupo) {
		List listaUsuarioDto = new ArrayList<>();
		for (Usuario usuario:usuarioRepository.findAll()) {
			UsuarioSalidaDto usuarioDto = UsuarioSalidaDto.crearUsuarioSalidaDtoDesdeUsuario(usuario);
			if (usuarioDto.getGrupo().getIdGrupo()==(grupo.getIdGrupo())){
				listaUsuarioDto.add(usuarioDto);
			}
			
		}
			
		return listaUsuarioDto;
	}

	@Override
	public Usuario findById(String username) {
		return usuarioRepository.findById(username).orElse(null);
	}


	@Override
	public List<Usuario> findAll() {
		return usuarioRepository.findAll();
	}
}
