create database pxldb;
\c pxldb

create user secadv with password 'ilovesecurity';
grant all privileges on database pxldb to secadv;
BEGIN;

create table users (id serial primary key, user_name text not null unique, password text not null);
grant all privileges on table users to secadv;

INSERT INTO users (user_name, password) VALUES ('pxl-admin', SHA256('secureandlovinit'));
INSERT INTO users (user_name, password) VALUES ('george', SHA256('iwishihadbetteradmins'));

COMMIT; 