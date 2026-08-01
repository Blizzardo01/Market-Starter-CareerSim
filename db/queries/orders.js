import db from "#db/client";

export async function create_order_for_user(order) {
  const { date, note, user_id } = order;

  const sql = `
    INSERT INTO orders (date, note, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const { rows } = await db.query(sql, [date, note, user_id]);
  return rows[0];
}

export async function get_orders_by_user_id(user_id) {
  const sql = `
    SELECT *
    FROM orders
    WHERE user_id = $1;
  `;

  const { rows } = await db.query(sql, [user_id]);
  return rows;
}

export async function get_order_by_id(id) {
  const sql = `
    SELECT *
    FROM orders
    WHERE id = $1;
  `;

  const { rows } = await db.query(sql, [id]);
  return rows[0];
}