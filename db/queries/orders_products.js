import db from "#db/client";

export async function create_orders_products(orders_products) {
  const { order_id, product_id, quantity } = orders_products;

  const sql = `
    INSERT INTO orders_products (order_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const { rows } = await db.query(sql, [
    order_id,
    product_id,
    quantity,
  ]);

  return rows[0];
}

export async function get_products_by_order_id(order_id) {
  const sql = `
    SELECT products.*, orders_products.quantity
    FROM products
    JOIN orders_products
      ON products.id = orders_products.product_id
    WHERE orders_products.order_id = $1;
  `;

  const { rows } = await db.query(sql, [order_id]);
  return rows;
}