CREATE DATABASE lifemate;
CREATE TYPE gender AS ENUM ('laki-laki', 'perempuan');
CREATE TABLE ACCOUNT (id serial primary key, name varchar(50) unique not null, email varchar(50) unique not null, password varchar(60) not null, gender gender not null, birthDate DATE not null);