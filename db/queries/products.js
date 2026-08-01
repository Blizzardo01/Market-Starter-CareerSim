import db from "#db/client";

export async function create_product(product) {
    const { title, description, price } = product;
    const sql = `
    INSERT INTO products (title, description, price)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;

    const response = await db.query(sql, [title, description, price]);
    return response.rows[0];
}