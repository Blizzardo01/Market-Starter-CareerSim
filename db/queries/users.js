import db from "#db/client";

export async function create_user(user) {
    const { username, password } = user;
    const sql = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *;
    `;
    const response = await db.query(sql, username, password);
    return response; 
}