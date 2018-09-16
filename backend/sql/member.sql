CREATE TABLE members (
    id SERIAL,
    email varchar(255) PRIMARY KEY, 
    password varchar(128),
    salt varchar(256)
    fullname varchar(255), 
    phone varchar(12),
    created_time timestamp DEFAULT current_timestamp,
    updated_time timestamp DEFAULT current_timestamp
)