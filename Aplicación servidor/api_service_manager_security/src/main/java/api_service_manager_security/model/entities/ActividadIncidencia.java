package api_service_manager_security.model.entities;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode(of = "idActividadIncidencia")

@Entity
@Table(name="actividades_inc")
public class ActividadIncidencia implements Serializable{
		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;

		@Id
		@Column(name ="id")
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int idActividadIncidencia;
		@ManyToOne
		@JoinColumn(name="id_incidencia")
		private Incidencia incidencia;
		@Column(name="fecha_comentario")
		private LocalDate fechaComentario;
		@ManyToOne
		@JoinColumn(name="autor")
		private Usuario autor;
		private String comentario;
		
}
