import db from "#db/client";

export async function create_orders_products(orders_products) {
    const { order_id, product_id, quantity } = orders_products;
    const sql = `
    INSERT INTO orders_products (order_id, product_id, quantity) 
    VALUES ($1, $2, $3)
    RETURNING *;
    `;  

    const response = await db.query(sql, [order_id, product_id, quantity]);
    return response.rows[0];
}