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
import api_service_manager_security.service.GrupoService;
import api_service_manager_security.service.UsuarioService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/grupos")
public class GrupoRestController {
	
	@Autowired
	private GrupoService grupoService;
	
	@GetMapping("/all")
	ResponseEntity<?> devolverTodos(){
		
		return ResponseEntity.ok(grupoService.findAll());
		
	}
	
	@PostMapping("/uno")
	ResponseEntity<?> devolverUno(@RequestBody int id){
		
		return ResponseEntity.ok(grupoService.findById(id));
		
	}
	
}
