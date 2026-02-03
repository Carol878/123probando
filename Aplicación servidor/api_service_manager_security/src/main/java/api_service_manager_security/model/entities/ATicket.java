package api_service_manager_security.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

import api_service_manager_security.model.dto.UsuarioSalidaDto;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of ="codigoTicket")

@Entity (name = "ATicket")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class ATicket {
  @Id @GeneratedValue(strategy = GenerationType.AUTO) // InheritanceType.TABLE_PER_CLASS usa AUTO
  @Column(name ="id_ticket")
  private int idTicket;

  @Column(name ="categoria_ticket")
  private String categoriaTicket;
  private String titulo;
  private String descripcion;
  
  @Column(name ="fecha_apertura")
  private LocalDate fechaApertura;
  @Column(name ="fecha_cierre")
  private LocalDate fechaCierre;
  
  
  @ManyToOne
  @JoinColumn(name ="abierto_por")
  private Usuario abiertoPor;  
  @ManyToOne
  @JoinColumn(name ="asignatario")
  private Usuario asignatario;    

  private String estado;
  @Column(name ="area_afectada")
  private String areaAfectada;
  @Column(name ="comentario_cierre")
  private String comentarioCierre;
  @Column(name ="tipo_cierre")
  private String tipoCierre;
  private String prioridad;      
  
  @ManyToOne
  @JoinColumn(name ="id_grupo")
  private Grupo grupo; 
  
  @Column(name ="codigo_ticket")
  private String codigoTicket; 
 
}
