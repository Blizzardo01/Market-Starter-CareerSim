import db from "#db/client";

export async function create_order_for_user(order) {
    const { date, note, user_id } = order;
    const sql = `
    INSERT INTO orders (date, note, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;

    const response = await db.query(sql, [date, note, user_id]);
    return response;
}