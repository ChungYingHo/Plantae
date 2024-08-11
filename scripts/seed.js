const { db } = require('@vercel/postgres')

async function clearTables(client) {
  try {
    // 清空所有資料表
    await client.query(`
      DROP TABLE IF EXISTS order_details;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)
    console.log('Tables cleared successfully.')
  } catch (error) {
    console.error('Error clearing tables:', error)
    throw error
  }
}

async function createTables(client) {
  try {
    // 創建用戶表
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          address VARCHAR(255) NOT NULL,
          phone VARCHAR(255) NOT NULL,
          email VARCHAR(255),
          payment VARCHAR(255) NOT NULL
      );
    `)

    // 創建產品表
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          unit VARCHAR(255) NOT NULL,
          price NUMERIC NOT NULL
      );
    `)

    // 創建訂單表
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          users_id INTEGER NOT NULL REFERENCES users(id),
          order_code VARCHAR(255) NOT NULL UNIQUE,
          total_price INTEGER NOT NULL,
          status VARCHAR(255) NOT NULL DEFAULT '訂單處理中',
          delivery_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          expect_delivery_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          tracking_number VARCHAR(255) DEFAULT '未出貨未有追蹤編號',
          note TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // 創建訂單明細表
    await client.query(`
      CREATE TABLE IF NOT EXISTS order_details (
          id SERIAL PRIMARY KEY,
          order_id INTEGER NOT NULL REFERENCES orders(id),
          product_id INTEGER NOT NULL REFERENCES products(id),
          quantity INTEGER NOT NULL
      );
    `)

    console.log('Tables created successfully.')
  } catch (error) {
    console.error('Error creating tables:', error)
    throw error
  }
}

async function insertProducts(client) {
  const productData = [
    {
      name: '老欉麻豆文旦-10斤',
      units: {
        name: '箱 / 10斤',
        price: 700
      }
    },
    {
      name: '老欉麻豆文旦-20斤',
      units: {
        name: '箱 / 20斤',
        price: 1320
      }
    }
  ]

  for (const product of productData) {
    await client.query(
      `
        INSERT INTO products (name, unit, price)
        VALUES ($1, $2, $3);
      `,
      [product.name, product.units.name, product.units.price]
    )
  }

  console.log('Products inserted successfully.')
}

// 在 main 函數中連接數據庫，並調用 createTables 函數創建表
async function main() {
  const client = await db.connect()
  await clearTables(client)
  await createTables(client)
  await insertProducts(client)
  await client.end()
}

main().catch((err) => {
  console.error('An error occurred while creating tables:', err)
})
