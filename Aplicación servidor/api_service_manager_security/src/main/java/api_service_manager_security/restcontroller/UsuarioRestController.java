package api_service_manager_security.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@GetMapping("/usuarios/grupo/{id}")
	ResponseEntity<?> devolverTodos(@PathVariable int id){
		
		return ResponseEntity.ok(usuarioService.findAllDeGrupo(id));
		
	}
	
	@PostMapping("/usuarios/uno")
	ResponseEntity<?> devolverUno(@RequestBody String username){
		
		return ResponseEntity.ok(usuarioService.findByIdDto(username));
		
	}
	
	
	
}
