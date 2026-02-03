package api_service_manager_security.model.dto;

import java.time.LocalDate;


import api_service_manager_security.model.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class IncidenciaEntradaDto {

	private int idTicket;
	private String categoriaTicket;
	private String titulo;
	private String descripcion;
	private LocalDate fechaApertura;
	private LocalDate fechaCierre;   
	private LocalDate fechaLimite;    
	private String abiertoPorUsername;    
	private String asignatarioUsername;   
	private String estado;
	private String areaAfectada;
	private String comentarioCierre;      
	private String tipoCierre;            
	private String prioridad;
	private Integer grupoId;              
	private String codigoTicket;

	
	
}
