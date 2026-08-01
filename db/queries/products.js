import db from "../client.js";

export async function create_product(product) {
  const { title, description, price } = product;

  const sql = `
    INSERT INTO products (title, description, price)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const { rows } = await db.query(sql, [title, description, price]);
  return rows[0];
}

export async function get_all_products() {
  const sql = `
    SELECT *
    FROM products;
  `;

  const { rows } = await db.query(sql);
  return rows;
}

export async function get_product_by_id(id) {
  const sql = `
    SELECT *
    FROM products
    WHERE id = $1;
  `;

  const { rows } = await db.query(sql, [id]);
  return rows[0];
}

export async function get_orders_by_product_id(product_id, user_id) {
  const sql = `
    SELECT orders.*
    FROM orders
    JOIN orders_products
      ON orders.id = orders_products.order_id
    WHERE orders_products.product_id = $1
      AND orders.user_id = $2;
  `;

  const { rows } = await db.query(sql, [product_id, user_id]);
  return rows;
}