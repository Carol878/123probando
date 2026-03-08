
USE service_manager_db;

DROP TABLE IF EXISTS busquedas;

CREATE TABLE busquedas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT,
    id_ticket VARCHAR(50),
    abierto_por VARCHAR(100),
    area_afectada VARCHAR(200),
    fecha_apertura DATE,
    fecha_cierre DATE,
    fecha_limite DATE,
    grupo_id INT,
    prioridad VARCHAR(50),
    estado VARCHAR(50),
    tipo_cierre VARCHAR(50),
    usuario_busqueda INT,
    FOREIGN KEY (usuario_busqueda) REFERENCES usuarios(username)
);