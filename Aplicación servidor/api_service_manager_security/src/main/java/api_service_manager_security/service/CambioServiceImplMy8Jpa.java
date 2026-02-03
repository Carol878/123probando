package api_service_manager_security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api_service_manager_security.model.entities.Cambio;
import api_service_manager_security.model.repository.CambioRepository;

@Service
public class CambioServiceImplMy8Jpa implements CambioService{

	@Autowired
    private CambioRepository cambioRepository;

    @Override
    public List<Cambio> findAll() {
        return cambioRepository.findAll();
    }

    @Override
    public Cambio findById(Integer id) {
        // Usamos orElse(null) para evitar Optional si no lo encuentra
        return cambioRepository.findById(id).orElse(null);
    }
    


    @Override
    public Cambio insertOne(Cambio obj) {
        return cambioRepository.save(obj);
    }

    @Override
    public Cambio updateOne(Cambio obj) {
        return cambioRepository.save(obj);
    }

    @Override
    public int deleteById(Integer id) {
        cambioRepository.deleteById(id);
        return 1; //Devuelve 1, exito
    }
    
}
