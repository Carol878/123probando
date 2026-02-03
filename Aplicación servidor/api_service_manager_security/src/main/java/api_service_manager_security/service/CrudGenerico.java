package api_service_manager_security.service;

import java.util.List;

public interface CrudGenerico<T,pk> {
	
	List<T> findAll();
	T findById(pk id);
	T insertOne(T obj);
	T updateOne(T obj);
	int deleteById(pk id);
}
