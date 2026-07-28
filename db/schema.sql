DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS orders_products CASCADE;
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username text UNIQUE NOT NULL,
    password text NOT NULL
);

CREATE TABLE orders (
    id serial PRIMARY KEY,
    date date NOT NULL,
    note text,
    user_id int NOT NULL REFERENCES users(id)
);

CREATE TABLE products (
    id serial PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    price decimal NOT NULL
);

CREATE TABLE orders_products (
    order_id int NOT NULL REFERENCES orders(id),
    product_id int NOT NULL REFERENCES products(id),
    quantity int NOT NULL
);


