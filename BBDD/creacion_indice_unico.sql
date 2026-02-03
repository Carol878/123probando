
-- Usar la base de datos
USE service_manager_db;

-- Desactivar el modo seguro para permitir actualizaciones controladas
SET SQL_SAFE_UPDATES = 0;


-- 1) Añadir la columna (NULLable para permitir AFTER INSERT)
ALTER TABLE incidencias
  ADD COLUMN codigo_ticket VARCHAR(12) NULL;

-- 2) Rellenar para filas existentes
UPDATE incidencias
SET codigo_ticket = CONCAT('INC', '-', LPAD(id_ticket, 5, '0'))
WHERE codigo_ticket IS NULL
  AND id_ticket IS NOT NULL;

-- 3) Índice único sobre el código
ALTER TABLE incidencias
  ADD UNIQUE KEY uq_incidencias_codigo (codigo_ticket);

-- 4) Triggers para autogenerar y proteger el código
DROP TRIGGER IF EXISTS trg_incidencias_codigo_ai;
DROP TRIGGER IF EXISTS trg_incidencias_codigo_bu;

DELIMITER //

-- AFTER INSERT: calcula el código cuando ya existe el AUTO_INCREMENT
CREATE TRIGGER trg_incidencias_codigo_ai
AFTER INSERT ON incidencias
FOR EACH ROW
BEGIN
  UPDATE incidencias
    SET codigo_ticket = CONCAT('INC', '-', LPAD(NEW.id_ticket, 5, '0'))
    WHERE id_ticket = NEW.id_ticket;
END//
  
-- BEFORE UPDATE: reestablece el código si alguien lo deja NULL o lo cambia
CREATE TRIGGER trg_incidencias_codigo_bu
BEFORE UPDATE ON incidencias
FOR EACH ROW
BEGIN
  IF NEW.codigo_ticket IS NULL
     OR NEW.codigo_ticket <> CONCAT('INC', '-', LPAD(NEW.id_ticket, 5, '0')) THEN
    SET NEW.codigo_ticket = CONCAT('INC', '-', LPAD(NEW.id_ticket, 5, '0'));
  END IF;
END//
DELIMITER ;


ALTER TABLE peticiones
  ADD COLUMN codigo_ticket VARCHAR(12) NULL;

UPDATE peticiones
SET codigo_ticket = CONCAT('RF', '-', LPAD(id_ticket, 5, '0'))
WHERE codigo_ticket IS NULL
  AND id_ticket IS NOT NULL;

ALTER TABLE peticiones
  ADD UNIQUE KEY uq_peticiones_codigo (codigo_ticket);

DROP TRIGGER IF EXISTS trg_peticiones_codigo_ai;
DROP TRIGGER IF EXISTS trg_peticiones_codigo_bu;

DELIMITER //
CREATE TRIGGER trg_peticiones_codigo_ai
AFTER INSERT ON peticiones
FOR EACH ROW
BEGIN
  UPDATE peticiones
    SET codigo_ticket = CONCAT('RF', '-', LPAD(NEW.id_ticket, 5, '0'))
    WHERE id_ticket = NEW.id_ticket;
END//

CREATE TRIGGER trg_peticiones_codigo_bu
BEFORE UPDATE ON peticiones
FOR EACH ROW
BEGIN
  IF NEW.codigo_ticket IS NULL
     OR NEW.codigo_ticket <> CONCAT('RF', '-', LPAD(NEW.id_ticket, 5, '0')) THEN
    SET NEW.codigo_ticket = CONCAT('RF', '-', LPAD(NEW.id_ticket, 5, '0'));
  END IF;
END//
DELIMITER ;


ALTER TABLE problemas
  ADD COLUMN codigo_ticket VARCHAR(12) NULL;

UPDATE problemas
SET codigo_ticket = CONCAT('PM', '-', LPAD(id_ticket, 5, '0'))
WHERE codigo_ticket IS NULL
  AND id_ticket IS NOT NULL;

ALTER TABLE problemas
  ADD UNIQUE KEY uq_problemas_codigo (codigo_ticket);

DROP TRIGGER IF EXISTS trg_problemas_codigo_ai;
DROP TRIGGER IF EXISTS trg_problemas_codigo_bu;

DELIMITER //
CREATE TRIGGER trg_problemas_codigo_ai
AFTER INSERT ON problemas
FOR EACH ROW
BEGIN
  UPDATE problemas
    SET codigo_ticket = CONCAT('PM', '-', LPAD(NEW.id_ticket, 5, '0'))
    WHERE id_ticket = NEW.id_ticket;
END//

CREATE TRIGGER trg_problemas_codigo_bu
BEFORE UPDATE ON problemas
FOR EACH ROW
BEGIN
  IF NEW.codigo_ticket IS NULL
     OR NEW.codigo_ticket <> CONCAT('PM', '-', LPAD(NEW.id_ticket, 5, '0')) THEN
    SET NEW.codigo_ticket = CONCAT('PM', '-', LPAD(NEW.id_ticket, 5, '0'));
  END IF;
END//
DELIMITER ;

ALTER TABLE cambios
  ADD COLUMN codigo_ticket VARCHAR(12) NULL;

UPDATE cambios
SET codigo_ticket = CONCAT('C', '-', LPAD(id_ticket, 5, '0'))
WHERE codigo_ticket IS NULL
  AND id_ticket IS NOT NULL;

ALTER TABLE cambios
  ADD UNIQUE KEY uq_cambios_codigo (codigo_ticket);

DROP TRIGGER IF EXISTS trg_cambios_codigo_ai;
DROP TRIGGER IF EXISTS trg_cambios_codigo_bu;

DELIMITER //
CREATE TRIGGER trg_cambios_codigo_ai
AFTER INSERT ON cambios
FOR EACH ROW
BEGIN
  UPDATE cambios
    SET codigo_ticket = CONCAT('C', '-', LPAD(NEW.id_ticket, 5, '0'))
    WHERE id_ticket = NEW.id_ticket;
END//

CREATE TRIGGER trg_cambios_codigo_bu
BEFORE UPDATE ON cambios
FOR EACH ROW
BEGIN
  IF NEW.codigo_ticket IS NULL
     OR NEW.codigo_ticket <> CONCAT('C', '-', LPAD(NEW.id_ticket, 5, '0')) THEN
    SET NEW.codigo_ticket = CONCAT('C', '-', LPAD(NEW.id_ticket, 5, '0'));
  END IF;
END//
DELIMITER ;

-- Rehabilitar el modo seguro al final
SET SQL_SAFE_UPDATES = 1;
