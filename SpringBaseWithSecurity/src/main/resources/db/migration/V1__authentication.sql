CREATE TABLE users
(
    id       UUID NOT NULL,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role     VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY (id)
);

INSERT INTO users (id, username, password, role)
VALUES ('33895e62-d149-4a68-8179-737ffc571e2a', 'user', '$2a$12$BBkpadbxAxeWX56ThZVRQuWFD3eTV9E/DynRb4ExjTd3.4GaJYetq',
        'ROLE_ADMIN');