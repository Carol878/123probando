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



commit;

insert into usuarios (username,password,nombre,email,enabled,id_grupo) values
('cgutierrez','{noop}celita', 'Celia','cgutierrez@empresa.com', 1,2);

commit;

UPDATE `service_manager_db`.`usuarios` SET `nombre` = 'Celia Gutierrez' WHERE (`username` = 'cgutierrez');
UPDATE `service_manager_db`.`usuarios` SET `nombre` = 'Pablo Granados' WHERE (`username` = 'pgranados');
commit;