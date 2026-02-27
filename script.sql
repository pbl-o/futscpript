
CREATE DATABASE futscript;
\c futscript;

drop database futscript

drop table equipos

drop table jugadores

drop table posiciones


CREATE TABLE equipos (id SERIAL PRIMARY KEY, name VARCHAR(250) NOT NULL);

CREATE TABLE posiciones (id SERIAL PRIMARY KEY, name VARCHAR(250) NOT NULL);

CREATE TABLE jugadores (id SERIAL PRIMARY KEY, id_equipo INT REFERENCES equipos(id), name VARCHAR(250), position INT REFERENCES posiciones(id));

INSERT INTO posiciones values
(DEFAULT, 'delantero'),
(DEFAULT, 'centrocampista'),
(DEFAULT, 'defensa'),
(DEFAULT, 'portero');

INSERT INTO equipos values
(DEFAULT, 'Colo-Colo'),
(DEFAULT, 'Huachipato'),
(DEFAULT, 'UC'),
(DEFAULT, 'U');

select * from equipos

select * from posiciones

select * from jugadores
