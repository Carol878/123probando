package api_service_manager_security.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import api_service_manager_security.model.entities.Peticion;

public interface PeticionRepository extends JpaRepository<Peticion, Integer> {

}
