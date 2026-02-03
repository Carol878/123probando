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

@Entity (name = "cambio")
@Table(name = "cambios")
public class Cambio extends ATicket{
	
	@Column(name ="categoria_cambio")
	private String categoriaCambio;
	@Column(name ="plan_implementacion")
	private String planImplementacion;
	@Column(name ="plan_marcha_atras")
	private String planMarchaAtras;
	//@Column(name ="inicio_implementacion_programado")
	//private LocalDateTime inicioImplementacionProgramado;
	//@Column(name ="fin_implementacion_programado")
	//private LocalDateTime finImplementacionProgramado;
	//@Column(name ="inicio_implementacion_real")
	//private LocalDateTime inicioImplementacionReal;
	//@Column(name ="fin_implementacion_real")
	//private LocalDateTime finImplementacionReal;
	@Column(name ="efecto_no_implementar")
	private String efectoNoImplementar;

}
