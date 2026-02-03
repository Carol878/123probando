package api_service_manager_security.model.entities;

import java.time.LocalDate;

import api_service_manager_security.model.dto.IncidenciaEntradaDto;
import api_service_manager_security.model.dto.UsuarioSalidaDto;
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

@Entity (name = "incidencia")
@Table(name = "incidencias")
public class Incidencia extends ATicket{
	
	@Column(name ="fecha_limite")
	  private LocalDate fechaLimite;

}
