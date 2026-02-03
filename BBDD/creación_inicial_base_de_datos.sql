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
        inicio_implementacion_programado datetime,
        fin_implementacion_programado datetime,
        inicio_implementacion_real datetime,
        fin_implementacion_real datetime,
        efecto_no_implementar varchar(250),
        id_grupo int,
        FOREIGN KEY (id_grupo) REFERENCES grupos (id_grupo),
        FOREIGN KEY (abierto_por) REFERENCES usuarios (username),
        FOREIGN KEY (asignatario) REFERENCES usuarios (username)
    );