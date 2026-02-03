package api_service_manager_security.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import api_service_manager_security.model.entities.Problema;

public interface ProblemaRepository extends JpaRepository<Problema, Integer>{

}
