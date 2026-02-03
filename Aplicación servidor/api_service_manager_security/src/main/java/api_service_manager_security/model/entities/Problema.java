package api_service_manager_security.model.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder

@Entity (name = "problema")
@Table(name = "problemas")
public class Problema extends ATicket{
	
	private String causa;
	
	@Column(name ="solucion_temporal")
	private String solucionTemporal;
	
	@Column(name ="solucion_permanente")
	private String solucionPermanente;
	
	@Column(name ="fecha_limite")
	  private LocalDateTime fechaLimite;
	
	

}
