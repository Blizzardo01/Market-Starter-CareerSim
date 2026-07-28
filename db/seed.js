import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user1 = await create_user({username: "johnothanisthebest007", password: "qwer1234"});
  const user2 = await create_user({username: "jaketheshake", password: "rewq4321"});
  const newOrder = await create_order_for_user({date: "02/24/2006", note: "order for the king", user_id: 1});
  const newOrder2 = await create_order_for_user({date: "08/28/2018", note: "order for bday", user_id: 2});
  const newProduct1 = await create_product_by_orderid(1, {title: "sword of grayskull", description: "I have the power!", price: 9999999.99});
  const newProduct2 = await create_product_by_orderid(1, {title: "crown of sorrow", description: "the crown bearer shall know pain.", price: 67.99});
  const newProduct4 = await create_product_by_orderid(1, {title: "kings cloth", description: "the kings clothing", price: 99.99});
  const newProduct3 = await create_product_by_orderid(1, {title: "the kings jester", description: "the kings entertainment", price: 199.99});
  const newProduct5 = await create_product_by_orderid(1, {title: "the throne", description: "the only chair for the king", price: 29.95});
  const newProduct6 = await create_product_by_orderid(2, {title: "friends", description: "friends can be bought too", price: 100.00});
  const newProduct7 = await create_product_by_orderid(2, {title: "birthday cake", description: "yum", price: 9.25});
  const newProduct8 = await create_product_by_orderid(2, {title: "birthday-themed plates", description: "plates for the cake", price: 2.25});
  const newProduct9 = await create_product_by_orderid(2, {title: "utensils", description: "utenisils for the cake", price: 29.95});
  const newProduct10 = await create_product_by_orderid(2, {title: "trampoline", description: "boing boing boing", price: 100000});

  
}
