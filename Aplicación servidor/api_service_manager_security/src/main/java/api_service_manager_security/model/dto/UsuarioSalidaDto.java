package api_service_manager_security.model.dto;

import java.util.List;

import api_service_manager_security.model.entities.Grupo;
import api_service_manager_security.model.entities.Rol;
import api_service_manager_security.model.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UsuarioSalidaDto {
	
	private String username;
	private String nombre;
	private String email;
	private Grupo grupo;
	private List<Rol> roles;
	
	public static UsuarioSalidaDto crearUsuarioSalidaDtoDesdeUsuario(Usuario usuario) {
		UsuarioSalidaDto usuarioSalidaDto = new UsuarioSalidaDto();
		usuarioSalidaDto.setUsername(usuario.getUsername());
		usuarioSalidaDto.setNombre(usuario.getNombre());
		usuarioSalidaDto.setEmail(usuario.getEmail());
		usuarioSalidaDto.setGrupo(usuario.getGrupo());
		usuarioSalidaDto.setRoles(usuario.getRoles());
		return usuarioSalidaDto;
	}
}
