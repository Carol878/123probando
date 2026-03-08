package api_service_manager_security.restcontroller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import api_service_manager_security.model.dto.UsuarioEntradaDto;
import api_service_manager_security.model.dto.UsuarioSalidaDto;
import api_service_manager_security.model.entities.Usuario;
import api_service_manager_security.security.JwtService;
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
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UserDetailsService userDetailsService;

	@PostMapping("/login")
	ResponseEntity<?> login(@RequestBody UsuarioEntradaDto usuario) {
		// Autenticar con Spring Security
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(usuario.getUsername(), usuario.getPassword())
				);

		// Si llegamos aquí, las credenciales son válidas
		UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getUsername());
		String token = jwtService.generateToken(userDetails);

		// Opcional: incluir datos del usuario en la respuesta
		Usuario usuarioCompleto = usuarioService.findById(usuario.getUsername());
		Map<String, Object> response = new HashMap<>();
		response.put("token", token);
		response.put("usuario", UsuarioSalidaDto.crearUsuarioSalidaDtoDesdeUsuario(usuarioCompleto));

		return ResponseEntity.ok(response);
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
