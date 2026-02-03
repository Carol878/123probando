-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS service_manager_db;

USE service_manager_db;
CREATE TABLE
    grupos (
        id_grupo int AUTO_INCREMENT PRIMARY KEY,
        nombre_grupo varchar(20)
    );

-- 3. Tabla de Usuarios
create table
    usuarios ( 
        username varchar(50) not null PRIMARY KEY,
        password text not null,
        nombre varchar(45) not null,
        email VARCHAR(100) NOT NULL UNIQUE,
        enabled int,
        id_grupo int,
        FOREIGN KEY (id_grupo) REFERENCES grupos (id_grupo)
    );

-- 2. Tabla de Roles (Para seguridad en Spring Security)
create table
    roles (
        id_rol int not null auto_increment primary key,
        nombre varchar(45) not null
    );

create table
    usuario_roles (
        username varchar(50) not null,
        id_rol int not null,
        primary key (username, id_rol),
        foreign key (username) references usuarios (username),
        foreign key (id_rol) references roles (id_rol)
    );



-- 4. Tabla de Categorías (Clasificación ITIL) 
CREATE TABLE
    incidencias (
        id_ticket int auto_increment PRIMARY KEY,
        categoria_ticket varchar(20) default 'INCIDENCIA',
        titulo varchar(250),
        descripcion varchar(250),
        fecha_apertura datetime,
        fecha_cierre datetime,
        fecha_limite datetime,
        abierto_por varchar(50),
        asignatario varchar(50),
        prioridad varchar(20),
        estado varchar(20),
        area_afectada varchar(50),
        comentario_cierre varchar(250),
        tipo_cierre varchar(20),
        id_grupo int,
        FOREIGN KEY (id_grupo) REFERENCES grupos (id_grupo),
        FOREIGN KEY (abierto_por) REFERENCES usuarios (username),
        FOREIGN KEY (asignatario) REFERENCES usuarios (username)
    );

CREATE TABLE
    peticiones (
        id_ticket int auto_increment PRIMARY KEY,
        categoria_ticket varchar(20) default 'PETICIÓN',
        titulo varchar(250),
        descripcion varchar(250),
        fecha_apertura datetime,
        fecha_cierre datetime,
        fecha_limite datetime,
        abierto_por varchar(50),
        asignatario varchar(50),
        prioridad varchar(20),
        estado varchar(20),
        area_afectada varchar(50),
        comentario_cierre varchar(250),
        tipo_cierre varchar(20),
        id_grupo int,
        FOREIGN KEY (id_grupo) REFERENCES grupos (id_grupo),
        FOREIGN KEY (abierto_por) REFERENCES usuarios (username),
        FOREIGN KEY (asignatario) REFERENCES usuarios (username)
    );

CREATE TABLE
    problemas (
        id_ticket int auto_increment PRIMARY KEY,
        categoria_ticket varchar(20) default 'PROBLEMA',
        titulo varchar(250),
        descripcion varchar(250),
        causa varchar(250),
        /*causa raíz de la incidencia*/
        solucion_temporal varchar(250),
        /*Acción que implementa el equipo técnico para resolver incidencia*/
        solucion_permanente varchar(250),
        /*Acción que implementa el equipo técnico para que no se repita la incidencia*/
        fecha_apertura datetime,
        fecha_cierre datetime,
        prioridad varchar(20),
        fecha_limite datetime,
        abierto_por varchar(50),
        asignatario varchar(50),
        estado varchar(20),
        area_afectada varchar(50),
        comentario_cierre varchar(250),
        tipo_cierre varchar(20),
        id_grupo int,
        FOREIGN KEY (id_grupo) REFERENCES grupos (id_grupo),
        FOREIGN KEY (abierto_por) REFERENCES usuarios (username),
        FOREIGN KEY (asignatario) REFERENCES usuarios (username)
    );

CREATE TABLE
    cambios (
        id_ticket int auto_increment PRIMARY KEY,
        categoria_ticket varchar(20) default 'CAMBIO',
        categoria_cambio varchar(20),
        /* estandar, normal, emergencia */
        titulo varchar(250),
        descripcion varchar(250),
        fecha_apertura datetime,
        fecha_cierre datetime,
        prioridad varchar(20),
        abierto_por varchar(50),
        asignatario varchar(50),
        estado varchar(20),
        /* Registrado, en curso, cerrado*/
        area_afectada varchar(50),
        /* Departamento afectado (ej: pasarela pago, gestión stock, etc) */
        comentario_cierre varchar(250),
        tipo_cierre varchar(20),
        /* satisfactorio, con errores, marcha atras, cancelado*/
        plan_implementacion varchar(250),
        plan_marcha_atras varchar(250),
        /*inicio_implementacion_programado datetime,
        fin_implementacion_programado datetime,
        inicio_implementacion_real datetime,
        fin_implementacion_real datetime,*/
        efecto_no_implementar varchar(250),
        id_grupo int,
        FOREIGN KEY (id_grupo) REFERENCES grupos (id_grupo),
        FOREIGN KEY (abierto_por) REFERENCES usuarios (username),
        FOREIGN KEY (asignatario) REFERENCES usuarios (username)
    );

    USE service_manager_db;

insert into roles(nombre) values
('ROL_TECNICO'),('ROL_USUARIO'),('ROL_ADMIN');

insert into grupos(nombre_grupo) values
('DevOps'),('BaseDatos'),('CAU');

insert into usuarios (username,password,nombre,email,enabled,id_grupo) values
('pgranados','{noop}pablin', 'Pablo','pgranados@empresa.com', 1,1),
('ncarol','{noop}carolinita', 'Carol','ncarol@empresa.com', 1,1),
('mcruz','{noop}martita', 'Marta','mcruz@empresa.com', 1,1);

insert into usuario_roles values
('pgranados',1), ('ncarol',1), ('mcruz',1);



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
  /*inicio_implementacion_programado, fin_implementacion_programado,
  inicio_implementacion_real, fin_implementacion_real,*/
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
 /* NULL,                     
  NULL,                     
  NULL,                     
  NULL,  */                    
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
  /*'2025-02-10 08:00:00',     
  '2025-02-10 08:00:00',     
  NULL,                       
  NULL,               */        
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
