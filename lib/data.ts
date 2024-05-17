'use server'

import { sql } from '@vercel/postgres'

// post the form data to the database
export async function postOrderData(data: any) {
  try {
    let userId
    // 檢查用戶是否已經存在
    const { rows: users } = await sql`
      SELECT id
      FROM users
      WHERE name = ${data.name}
      AND address = ${data.address}
      AND phone = ${data.phone}
      AND email = ${data.email}
      AND payment = ${data.payment}
    `
    console.log('users', users)

    if (users.length > 0) {
      userId = users[0].id
    } else {
      const { rows: newUser } = await sql`
        INSERT INTO users (name, address, phone, email, payment)
        VALUES (${data.name}, ${data.address}, ${data.phone}, ${data.email}, ${data.payment})
        RETURNING id
      `
      userId = newUser[0].id
    }

    // 創建訂單
    const { rows: order } = await sql`
      INSERT INTO orders (users_id, order_code, total_price, note)
      VALUES (${userId}, ${data.orderCode}, ${data.totalPrice}, ${data.note})
      RETURNING id
    `
    console.log('order', order)
    const orderId = order[0].id
    console.log('orderId', orderId)

    // 創建訂單明細
    for (const item of data.items) {
      const { rows: product } = await sql`
        SELECT id
        FROM products
        WHERE name = ${item.name}
      `
      const productId = product[0].id
      console.log('product', product)
      console.log('productId', productId)

      await sql`
        INSERT INTO order_details (order_id, product_id, quantity)
        VALUES (${orderId}, ${productId}, ${item.quantity})
      `
    }

    const response = 'success'

    return response
  } catch (error) {
    console.error('Find exist user error', error)
    throw new Error('Find exist user error')
  }
}

// search the order data from the database
export async function getSearchData(orderCode: string) {
  try {
    // 撈取訂單資料
    const { rows: order } = await sql`
      SELECT
        orders.id,
        orders.order_code,
        orders.status,
        orders.tracking_number,
        orders.delivery_time,
        orders.expect_delivery_time,
        users.name,
        users.phone,
        users.email,
        users.address
      FROM orders
      JOIN users ON orders.users_id = users.id
      WHERE orders.order_code = ${orderCode}
    `
    const userInfo = order[0]

    // 撈訂購商品資料
    const { rows: products } = await sql`
      SELECT
        products.name,
        order_details.quantity
      FROM order_details
      JOIN products ON order_details.product_id = products.id
      WHERE order_details.order_id = ${order[0].id}
    `

    const productsInfo = products

    const response = {
      userInfo: userInfo,
      productsInfo: productsInfo
    }

    return response
  } catch (error) {
    console.error('Search order error', error)
    throw new Error('Search order error')
  }
}

// get all order data from the database
export async function getAllOrderData() {
  try {
    const { rows: orders } = await sql`
    SELECT
      orders.id AS order_id,
      orders.users_id,
      orders.order_code,
      orders.total_price,
      orders.status,
      orders.delivery_time,
      orders.expect_delivery_time,
      orders.tracking_number,
      orders.note,
      orders.created_at AS order_created_at,
      users.id AS user_id,
      users.name AS user_name,
      users.address AS user_address,
      users.phone AS user_phone,
      users.email AS user_email,
      users.payment AS user_payment,
      array_agg(products.name) AS product_names,
      array_agg(products.unit) AS product_units,
      array_agg(order_details.quantity) AS product_quantities
    FROM orders
    JOIN users ON orders.users_id = users.id
    JOIN order_details ON orders.id = order_details.order_id
    JOIN products ON order_details.product_id = products.id
    GROUP BY orders.id, users.id
    ORDER BY orders.created_at ASC
    `

    const response = orders

    return response
  } catch (error) {
    console.error('Get all order error', error)
    throw new Error('Get all order error')
  }
}

// update the order status in the database
export async function updateStatus(data: any) {
  try {
    await sql`
      UPDATE orders
      SET status = ${data.status},
      tracking_number = ${data.trackingNumber},
      delivery_time = ${data.deliveryTime},
      expect_delivery_time = ${data.expectDeliveryTime}
      WHERE order_code = ${data.orderId}
    `
    const response = 'success'

    return response
  } catch (error) {
    console.error('Update order status error', error)
    throw new Error('Update order status error')
  }
}

// delete the order data from the database
export async function deleteOrderData(orderId: number) {
  try {
    // 刪除訂單明細
    await sql`
      DELETE FROM order_details
      WHERE order_id = ${orderId}
    `

    // 刪除訂單
    await sql`
      DELETE FROM orders
      WHERE id = ${orderId}
    `

    // 檢查是否還有其他訂單使用相同的使用者
    const { rowCount } = await sql`
      SELECT COUNT(*)
      FROM orders
      WHERE users_id = (SELECT users_id FROM orders WHERE id = ${orderId})
    `

    // 如果沒有其他訂單使用相同的使用者，則刪除使用者
    if (rowCount === 0) {
      await sql`
        DELETE FROM users
        WHERE id = (SELECT users_id FROM orders WHERE id = ${orderId})
      `
    }

    return 'success'
  } catch (error) {
    console.error('Delete order error', error)
    throw new Error('Delete order error')
  }
}
