package api_service_manager_security.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import api_service_manager_security.model.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {

	public Usuario findByUsernameAndPassword(String username, String password);
}
