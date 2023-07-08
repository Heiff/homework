CREATE TABLE auth(
    id serial not null primary key,
    username varchar(32) not null unique,
    password varchar(64) not null   
);
CREATE TABLE experts(
    id serial not null primary key,
    image text not null,
    name varchar(32),
    field varchar(64) not null
);

CREATE TABLE popularcourses(
    id serial not null primary key,
    image text not null,
    price integer ,
    field text not null
);
CREATE TABLE studentssay(
    id serial not null primary key,
    image text not null,
    name varchar(32) not null,
    descr text not null
);