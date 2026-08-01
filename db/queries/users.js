import db from "#db/client";

export async function create_user({ username, password }) {
  const sql = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const { rows } = await db.query(sql, [username, password]);
  return rows[0];
}

export async function get_user_by_username(username) {
  const sql = `
    SELECT *
    FROM users
    WHERE username = $1;
  `;

  const { rows } = await db.query(sql, [username]);
  return rows[0];
}

export async function get_user_by_id(id) {
  const sql = `
    SELECT id, username
    FROM users
    WHERE id = $1;
  `;

  const { rows } = await db.query(sql, [id]);
  return rows[0];
}