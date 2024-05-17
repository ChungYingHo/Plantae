#### Users Table
| Column     | Type         | Constraints          | Description                        |
|------------|--------------|----------------------|------------------------------------|
| id         | SERIAL       | PRIMARY KEY          | 唯一標識符，自動生成序列號            |
| name       | VARCHAR(50)  | NOT NULL             | 用戶名                             |
| address    | VARCHAR(255) | NOT NULL             | 用戶地址                           |
| phone      | VARCHAR(20)  | NOT NULL             | 用戶電話號碼                       |
| payment    | VARCHAR(255)  | NOT NULL             | 匯款帳號                         |
| email      | VARCHAR(255)  |                      | 用戶 Email                         |

#### Products Table
| Column      | Type         | Constraints | Description                    |
|-------------|--------------|-------------|--------------------------------|
| id          | SERIAL       | PRIMARY KEY | 唯一標識符，自動生成序列號        |
| name        | VARCHAR(255) | NOT NULL    | 產品名稱                         |
| unit        | VARCHAR(50)  | NOT NULL    | 產品單位                         |
| price       | NUMERIC      | NOT NULL    | 產品價格                         |

#### Orders Table
| Column                | Type        | Constraints                          | Description             |
|-----------------------|-------------|--------------------------------------|-------------------------|
| id                    | SERIAL      | PRIMARY KEY                          | 唯一標識符，自動生成序列號  |
| users_id              | INTEGER     | NOT NULL REFERENCES users(id)        | 關聯用戶ID               |
| order_code            | VARCHAR(20) | NOT NULL                             | 訂單編號                |
| total_price           | INTEGER     | NOT NULL                             | 總價                    |
| status                | VARCHAR(20) | NOT NULL DEFAULT '訂單處理中'         | 訂單狀態                |
| delivery_time         | TIMESTAMP   |                                      | 寄出時間                |
| expect_delivery_time  | TIMESTAMP   |                                      | 預計寄出時間            |
| tracking_number       | VARCHAR(20) |                                      | 物流追蹤編號            |
| note                  | TEXT        |                                      | 訂單備註                |
| created_at            | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP            | 創建時間                |


#### Order Details Table
| Column      | Type          | Constraints                        | Description                   |
|-------------|---------------|------------------------------------|-------------------------------|
| id          | SERIAL        | PRIMARY KEY                        | 唯一標識符，自動生成序列號       |
| order_id    | INTEGER       | NOT NULL REFERENCES orders(id)     | 關聯訂單ID                     |
| product_id  | INTEGER       | NOT NULL REFERENCES products(id)   | 關聯產品ID                     |
| quantity    | INTEGER       | NOT NULL                           | 訂購數量                       |