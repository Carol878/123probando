USE service_manager_db;
INSERT INTO incidencias (
    categoria_ticket, titulo, descripcion,
    fecha_apertura, fecha_cierre, fecha_limite,
    abierto_por, asignatario,
    prioridad, estado, area_afectada,
    comentario_cierre, tipo_cierre,
    id_grupo
)
VALUES
-- 1
('INCIDENCIA',
 'Error en servidor Linux - No arranca servicio Apache',
 'El servidor web Apache en el servidor Linux de producción no inicia después del último reinicio',
 '2024-01-15 09:30:00', NULL, '2024-01-16 18:00:00',
 'mcruz', 'pgranados',
 'Crítica', 'En curso', 'Infraestructura',
 NULL, NULL,
 1),

-- 2
('INCIDENCIA',
 'Error en servidor de aplicación de Service Manager',
 'El portal web se queda bloqueado al iniciar sesión',
 '2024-01-15 09:30:00', '2024-01-15 11:30:00', '2024-01-16 18:00:00',
 'mcruz', 'ncarol',
 'Alta', 'Cerrado', 'Service Manager',
 'Se reinicia el servicio', 'Satisfactorio',
 1),

-- 3
('INCIDENCIA',
 'No funciona la integración con la herramienta de monitorización',
 'El servidor de service manager no integra correctamente la configuración de dynatrace',
 '2024-01-15 09:30:00', NULL, '2024-01-16 18:00:00',
 'mcruz', 'mcruz',
 'Crítica', 'En curso', 'Dynatrace',
 NULL, NULL,
 1);

 INSERT INTO peticiones (
    categoria_ticket, titulo, descripcion,
    fecha_apertura, fecha_cierre, fecha_limite,
    abierto_por, asignatario,
    prioridad, estado, area_afectada,
    comentario_cierre, tipo_cierre,
    id_grupo
)
VALUES
-- 1
('PETICION',
 'Solicitud de configuración de VS code',
 'Necesito configurar VS code en mi portatil del trabajo',
 '2024-01-16 10:15:00', NULL, '2024-01-18 17:00:00',
 'pgranados', 'ncarol',
 'Media', 'En curso', 'Visual Studio Code',
 NULL, NULL,
 1),

-- 2
('PETICION',
 'Solicitud de configuración de VS code',
 'Necesito configurar VS code en mi ordenador para poder trabajar',
 '2024-01-16 10:15:00', NULL, '2024-01-18 17:00:00',
 'mcruz', 'ncarol',
 'Media', 'En curso', 'Visual Studio Code',
 NULL, NULL,
 1);


 INSERT INTO cambios (
  categoria_ticket,
  categoria_cambio,
  titulo, descripcion,
  fecha_apertura, fecha_cierre, prioridad,
  abierto_por, asignatario, estado,
  area_afectada, comentario_cierre, tipo_cierre,
  plan_implementacion, plan_marcha_atras,
  inicio_implementacion_programado, fin_implementacion_programado,
  inicio_implementacion_real, fin_implementacion_real,
  efecto_no_implementar,
  id_grupo
)
VALUES
(
  'CAMBIO',
  'Estandar',
  'Compilar Vistas materializas',
  'Se solicita compilar las vistas materializas de la BBDD de service manager',
  '2024-01-10 08:00:00',      
  NULL,                       
  'Baja',
  'ncarol',                          
  NULL,                      
  'Abierto',
  'Service Manager',
  NULL,                       
  NULL,                      
  NULL,                       
  NULL,                       
  NULL,                      
  NULL,                     
  NULL,                     
  NULL,                     
  'No se actualizaran los tickets correctamente',
  2                          
),
(
  'CAMBIO',
  'Normal',
  'Desplegar SM 1.0',
  'Se solicita desplegar la nueva versión de service manager',
  '2025-01-10 08:00:00',     
  NULL,                       
  'Media',
  'pgranados',                          
  'pgranados',                          
  'Planificación',
  'Service Manager',
  NULL,                       
  NULL,                       
  'Despleagr wars, configurar ficheros y servicios.',
  'Volver a la versión anterior',
  '2025-02-10 08:00:00',     
  '2025-02-10 08:00:00',      
  NULL,                       
  NULL,                       
  'No se implementaran las nuevas funciónes.',
  1                           
);

INSERT INTO problemas (
    categoria_ticket,
    titulo, descripcion,
    causa, solucion_temporal, solucion_permanente,
    fecha_apertura, fecha_cierre, prioridad, fecha_limite,
    abierto_por, asignatario, estado, area_afectada,
    comentario_cierre, tipo_cierre,
    id_grupo
)
VALUES
(
  'PROBLEMA',
  'Caída recurrente de la aplicación',
  'El servidor de aplicación de Service Manager se cae al realizar determinadas consultas.',
  'Memory leak en proceso de indexación de búsqueda',
  'Reinicio con un script que revisa el servicio activo',
  NULL,                                           
  '2024-01-05 11:00:00',                         
  NULL,                                           
  'Baja',
  '2025-01-12 18:00:00',                          
  'mcruz',                                             
  'pgranados',                                             
  'En curso',
  'Infraestructura',
  NULL,                                        
  NULL,                                      
  1                                             
);
 
commit;
