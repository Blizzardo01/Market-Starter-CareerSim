import db from "#db/client";
import { create_user } from "./queries/users.js";
import { create_order_for_user } from "./queries/orders.js";
import { create_product } from "./queries/products.js";
import { create_orders_products } from "./queries/orders_products.js";

await db.connect();
await seed();
await db.end();

console.log("🌱 Database seeded.");

async function seed() {
  // Users
  const user1 = await create_user({
    username: "johnothanisthebest007",
    password: "qwer1234",
  });

  const user2 = await create_user({
    username: "jaketheshake",
    password: "rewq4321",
  });

  // Orders
  const newOrder = await create_order_for_user({
    date: "2006-02-24",
    note: "order for the king",
    user_id: user1.id,
  });

  const newOrder2 = await create_order_for_user({
    date: "2018-08-28",
    note: "order for bday",
    user_id: user2.id,
  });

  // Products
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

  // Add 5 distinct products to the first order
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