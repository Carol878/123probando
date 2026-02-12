-- Usar la base de datos
USE service_manager_db;

-- Desactivar el modo seguro
SET SQL_SAFE_UPDATES = 0;

-- ========== INCIDENCIAS ==========
-- Borrar columna si existe (ignorar error si no)
ALTER TABLE incidencias DROP COLUMN codigo_ticket;

-- Añadir la columna
ALTER TABLE incidencias
  ADD COLUMN codigo_ticket VARCHAR(12) NULL;

-- Rellenar para filas existentes
UPDATE incidencias
SET codigo_ticket = CONCAT('INC', '-', LPAD(id_ticket, 5, '0'))
WHERE id_ticket IS NOT NULL;

-- Borrar triggers si existen
DROP TRIGGER IF EXISTS trg_incidencias_codigo_ai;
DROP TRIGGER IF EXISTS trg_incidencias_codigo_bu;
DROP TRIGGER IF EXISTS trg_incidencias_codigo_bi;

-- Crear trigger BEFORE INSERT
DELIMITER //

CREATE TRIGGER trg_incidencias_codigo_bi
BEFORE INSERT ON incidencias
FOR EACH ROW
BEGIN
  DECLARE next_id INT;
  
  -- Obtener el próximo valor de auto_increment
  SELECT AUTO_INCREMENT INTO next_id
  FROM information_schema.TABLES
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'incidencias';
  
  -- Si no se obtiene, usar 1
  IF next_id IS NULL THEN
    SET next_id = 1;
  END IF;
  
  SET NEW.codigo_ticket = CONCAT('INC', '-', LPAD(next_id, 5, '0'));
END//

DELIMITER ;

-- Crear índice único (ignorar si ya existe)
CREATE INDEX uq_incidencias_codigo ON incidencias(codigo_ticket);

-- ========== PETICIONES ==========
ALTER TABLE peticiones DROP COLUMN codigo_ticket;

ALTER TABLE peticiones
  ADD COLUMN codigo_ticket VARCHAR(12) NULL;

UPDATE peticiones
SET codigo_ticket = CONCAT('RF', '-', LPAD(id_ticket, 5, '0'))
WHERE id_ticket IS NOT NULL;

DROP TRIGGER IF EXISTS trg_peticiones_codigo_ai;
DROP TRIGGER IF EXISTS trg_peticiones_codigo_bu;
DROP TRIGGER IF EXISTS trg_peticiones_codigo_bi;

DELIMITER //

CREATE TRIGGER trg_peticiones_codigo_bi
BEFORE INSERT ON peticiones
FOR EACH ROW
BEGIN
  DECLARE next_id INT;
  
  SELECT AUTO_INCREMENT INTO next_id
  FROM information_schema.TABLES
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'peticiones';
  
  IF next_id IS NULL THEN
    SET next_id = 1;
  END IF;
  
  SET NEW.codigo_ticket = CONCAT('RF', '-', LPAD(next_id, 5, '0'));
END//

DELIMITER ;

CREATE INDEX uq_peticiones_codigo ON peticiones(codigo_ticket);

-- ========== PROBLEMAS ==========
ALTER TABLE problemas DROP COLUMN codigo_ticket;

ALTER TABLE problemas
  ADD COLUMN codigo_ticket VARCHAR(12) NULL;

UPDATE problemas
SET codigo_ticket = CONCAT('PM', '-', LPAD(id_ticket, 5, '0'))
WHERE id_ticket IS NOT NULL;

DROP TRIGGER IF EXISTS trg_problemas_codigo_ai;
DROP TRIGGER IF EXISTS trg_problemas_codigo_bu;
DROP TRIGGER IF EXISTS trg_problemas_codigo_bi;

DELIMITER //

CREATE TRIGGER trg_problemas_codigo_bi
BEFORE INSERT ON problemas
FOR EACH ROW
BEGIN
  DECLARE next_id INT;
  
  SELECT AUTO_INCREMENT INTO next_id
  FROM information_schema.TABLES
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'problemas';
  
  IF next_id IS NULL THEN
    SET next_id = 1;
  END IF;
  
  SET NEW.codigo_ticket = CONCAT('PM', '-', LPAD(next_id, 5, '0'));
END//

DELIMITER ;

CREATE INDEX uq_problemas_codigo ON problemas(codigo_ticket);

-- ========== CAMBIOS ==========
ALTER TABLE cambios DROP COLUMN codigo_ticket;

ALTER TABLE cambios
  ADD COLUMN codigo_ticket VARCHAR(12) NULL;

UPDATE cambios
SET codigo_ticket = CONCAT('C', '-', LPAD(id_ticket, 5, '0'))
WHERE id_ticket IS NOT NULL;

DROP TRIGGER IF EXISTS trg_cambios_codigo_ai;
DROP TRIGGER IF EXISTS trg_cambios_codigo_bu;
DROP TRIGGER IF EXISTS trg_cambios_codigo_bi;

DELIMITER //

CREATE TRIGGER trg_cambios_codigo_bi
BEFORE INSERT ON cambios
FOR EACH ROW
BEGIN
  DECLARE next_id INT;
  
  SELECT AUTO_INCREMENT INTO next_id
  FROM information_schema.TABLES
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'cambios';
  
  IF next_id IS NULL THEN
    SET next_id = 1;
  END IF;
  
  SET NEW.codigo_ticket = CONCAT('C', '-', LPAD(next_id, 5, '0'));
END//

DELIMITER ;

CREATE INDEX uq_cambios_codigo ON cambios(codigo_ticket);

-- Rehabilitar el modo seguro
SET SQL_SAFE_UPDATES = 1;