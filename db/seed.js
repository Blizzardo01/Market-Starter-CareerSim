import db from "#db/client";
import bcrypt from "bcrypt";
import { create_user } from "#db/queries/users";
import { create_order_for_user } from "#db/queries/orders";
import { create_product } from "#db/queries/products";
import { create_orders_products } from "#db/queries/orders_products";

await db.connect();
await seed();
await db.end();

console.log("🌱 Database seeded.");

async function seed() {
  await db.query(`
    TRUNCATE TABLE
      orders_products,
      orders,
      products,
      users
    RESTART IDENTITY CASCADE;
  `);

  const user1 = await create_user({
    username: "johnothanisthebest007",
    password: await bcrypt.hash("qwer1234", 10),
  });

  const user2 = await create_user({
    username: "jaketheshake",
    password: await bcrypt.hash("rewq4321", 10),
  });

  const newOrder = await create_order_for_user({
    date: "2006-02-24",
    note: "order for the king",
    user_id: user1.id,
  });

  await create_order_for_user({
    date: "2018-08-28",
    note: "order for bday",
    user_id: user2.id,
  });

  const newProduct1 = await create_product({
    title: "Sword of Grayskull",
    description: "I have the power!",
    price: 9999999.99,
  });

  const newProduct2 = await create_product({
    title: "Crown of Sorrow",
    description: "The crown bearer shall know pain.",
    price: 67.99,
  });

  const newProduct3 = await create_product({
    title: "The King's Jester",
    description: "The king's entertainment.",
    price: 199.99,
  });

  const newProduct4 = await create_product({
    title: "King's Cloth",
    description: "The king's clothing.",
    price: 99.99,
  });

  const newProduct5 = await create_product({
    title: "The Throne",
    description: "The only chair for the king.",
    price: 29.95,
  });

  const newProduct6 = await create_product({
    title: "Friends",
    description: "Friends can be bought too.",
    price: 100.00,
  });

  const newProduct7 = await create_product({
    title: "Birthday Cake",
    description: "Yum.",
    price: 9.25,
  });

  const newProduct8 = await create_product({
    title: "Birthday-Themed Plates",
    description: "Plates for the cake.",
    price: 2.25,
  });

  const newProduct9 = await create_product({
    title: "Utensils",
    description: "Utensils for the cake.",
    price: 29.95,
  });

  const newProduct10 = await create_product({
    title: "Trampoline",
    description: "Boing boing boing.",
    price: 100000,
  });

  await create_orders_products({
    order_id: newOrder.id,
    product_id: newProduct1.id,
    quantity: 1,
  });

  await create_orders_products({
    order_id: newOrder.id,
    product_id: newProduct2.id,
    quantity: 2,
  });

  await create_orders_products({
    order_id: newOrder.id,
    product_id: newProduct3.id,
    quantity: 1,
  });

  await create_orders_products({
    order_id: newOrder.id,
    product_id: newProduct4.id,
    quantity: 3,
  });

  await create_orders_products({
    order_id: newOrder.id,
    product_id: newProduct5.id,
    quantity: 1,
  });
}