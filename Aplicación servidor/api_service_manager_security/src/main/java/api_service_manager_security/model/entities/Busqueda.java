package api_service_manager_security.model.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
@EqualsAndHashCode(of = "idBusqueda")

@Entity
@Table(name = "busquedas")
public class Busqueda implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idBusqueda;
    
    @Column(name = "texto")
    private String texto;
    
    @Column(name = "id_ticket")
    private String idTicket;
    
    @Column(name = "abierto_por")
    private String abiertoPor;
    
    @Column(name = "area_afectada")
    private String areaAfectada;
    
    @Column(name = "fecha_apertura")
    private LocalDate fechaApertura;
    
    @Column(name = "fecha_cierre")
    private LocalDate fechaCierre;
    
    @Column(name = "fecha_limite")
    private LocalDate fechaLimite;
    
    @Column(name = "grupo_id")
    private Integer grupo;
    
    @Column(name = "prioridad")
    private String prioridad;
    
    @Column(name = "estado")
    private String estado;
    
    @Column(name = "tipo_cierre")
    private String tipoCierre;
    
    @ManyToOne
    @JoinColumn(name = "usuario_busqueda")
    private Usuario usuario;
}