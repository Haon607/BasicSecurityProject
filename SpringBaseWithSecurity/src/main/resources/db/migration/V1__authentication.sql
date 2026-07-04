CREATE TABLE users
(
    id       UUID NOT NULL,
    username VARCHAR(255),
    password VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY (id)
);