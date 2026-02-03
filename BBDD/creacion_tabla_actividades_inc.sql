

USE service_manager_db;

DROP TABLE IF EXISTS actividades_inc;

CREATE TABLE actividades_inc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_comentario DATETIME NOT NULL,
    autor VARCHAR(50) NOT NULL,
    comentario VARCHAR(2000) NOT NULL,
    id_incidencia INT NOT NULL,

    FOREIGN KEY (autor) REFERENCES usuarios(username),
    FOREIGN KEY (id_incidencia) REFERENCES incidencias(id_ticket)
);


USE service_manager_db;

INSERT INTO actividades_inc (
    fecha_comentario,
    autor,
    comentario,
    id_incidencia
)
VALUES
-- Actividades para la incidencia 1
('2024-01-15 10:00:00', 'pgranados',
 'Se revisa el estado del servicio Apache. Se detecta que el proceso no está iniciando correctamente.',
 1),

('2024-01-15 10:45:00', 'ncarol',
 'Se valida configuración de Apache y se revisan los logs de error. Parece un problema con los módulos SSL.',
 1),

('2024-01-15 12:30:00', 'mcruz',
 'Se reinician servicios dependientes y se abre caso con infraestructura para revisión del certificado SSL.',
 1),

-- Actividades para la incidencia 2
('2024-01-15 09:45:00', 'ncarol',
 'Se comprueba que el portal no responde correctamente tras autenticación. Posible bloqueo por timeout.',
 2),

('2024-01-15 11:10:00', 'pgranados',
 'Se reinicia servicio del portal y se confirma recuperación. Se cierra incidencia.',
 2),

-- Actividades para la incidencia 3
('2024-01-15 11:00:00', 'mcruz',
 'Se revisa configuración de integración con Dynatrace y se detectan parámetros mal cargados.',
 3),

('2024-01-15 12:15:00', 'pgranados',
 'Se actualiza configuración y reinicia el servicio. Pendiente de validación final.',
 3);

 
commit;
