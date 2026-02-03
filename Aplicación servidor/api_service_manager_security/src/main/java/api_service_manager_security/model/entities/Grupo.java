package api_service_manager_security.model.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@EqualsAndHashCode(of = "idGrupo")

@Entity
@Table(name="grupos")
public class Grupo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name ="id_grupo")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idGrupo;
	@Column(name ="nombre_grupo")
	private String nombreGrupo;
	
}