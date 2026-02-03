package api_service_manager_security.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api_service_manager_security.model.dto.UsuarioEntradaDto;
import api_service_manager_security.model.dto.UsuarioSalidaDto;
import api_service_manager_security.model.entities.Grupo;
import api_service_manager_security.model.entities.Usuario;
import api_service_manager_security.model.repository.UsuarioRepository;
import api_service_manager_security.service.UsuarioService;

@RestController
@CrossOrigin(origins = "*")
public class UsuarioRestController {
	
	@Autowired
	private UsuarioService usuarioService;

	@GetMapping("/hola")
	String hola(Authentication auth) {
		
		return "hola " +  auth;
	}
	
	@GetMapping("/usuarios/all")
    public ResponseEntity<?> obtenerTodosLosUsuarios() {
        List<Usuario> usuarios = usuarioService.findAll();
        // Limpiamos passwords para seguridad
        for (Usuario u : usuarios) {
            u.setPassword(null);
        }
        return ResponseEntity.ok(usuarios);
    }
	
	@PostMapping("/login")
	ResponseEntity<?> login(@RequestBody UsuarioEntradaDto usuario){
		Usuario usuarioValido = usuarioService.findByUsernameAndPassword(usuario.getUsername(),"{noop}" + usuario.getPassword());
		if (usuarioValido != null) {
			return ResponseEntity.ok(UsuarioSalidaDto.crearUsuarioSalidaDtoDesdeUsuario(usuarioValido));
		}
		else {
			return ResponseEntity.status(400).body("Usuario o contraseña incorrectas");
		}
		
		
	}
	
	@PostMapping("/usuarios/grupo")
	ResponseEntity<?> devolverTodos(@RequestBody Grupo grupo){
		
		return ResponseEntity.ok(usuarioService.findAllDeGrupo(grupo));
		
	}
	
	@PostMapping("/usuarios/uno")
	ResponseEntity<?> devolverUno(@RequestBody String username){
		
		return ResponseEntity.ok(usuarioService.findByIdDto(username));
		
	}
	
	
	
}
