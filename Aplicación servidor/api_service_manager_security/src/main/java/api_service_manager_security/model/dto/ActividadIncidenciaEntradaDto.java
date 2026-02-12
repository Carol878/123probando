package api_service_manager_security.model.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ActividadIncidenciaEntradaDto {
	
	private int idTicket;
	private String autor;
	private String comentario;
}
