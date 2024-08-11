import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
  Button
} from '@nextui-org/react'

function formatDate(isoDateString: string) {
  const date = new Date(isoDateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

// @ts-ignore
const OrderCard = ({ orderData, handleAskDelete, handleAskEdit }) => {
  return (
    <>
      {orderData.map((order: any) => (
        <Card key={order.order_id} className="mb-5 h-fit w-full">
          <CardHeader className="flex flex-col items-start gap-1">
            <h4 className="text-base font-semibold">{order.order_code}</h4>
            <p className="text-sm">{formatDate(order.order_created_at)}</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-3 lg:flex-row">
            <Card className="w-full lg:w-1/3">
              <CardHeader>
                <h5 className="text-base font-semibold">收件人資訊</h5>
              </CardHeader>
              <CardBody>
                <p className="mb-2 text-base">姓名：{order.user_name}</p>
                <p className="mb-2 text-base">電話：{order.user_phone}</p>
                <p className="mb-2 text-base">
                  Email：{order.user_email ? order.user_email : '未提供'}
                </p>
                <p className="mb-2 text-base">地址：{order.user_address}</p>
                <p className="mb-2 text-base">匯款：{order.user_payment}</p>
                <p className="mb-2 text-base">
                  備註：{order.note ? order.note : '未提供'}
                </p>
              </CardBody>
            </Card>

            <Card className="w-full lg:w-1/3">
              <CardHeader>
                <h5 className="text-base font-semibold">訂單狀態</h5>
              </CardHeader>
              <CardBody>
                <p className="mb-2 text-base">狀態：{order.status}</p>
                <p className="mb-2 text-base">
                  預計運送時間：2024-09-03
                  {/* {formatDate(order.expect_delivery_time)} */}
                </p>
                <p className="mb-2 text-base">
                  運送時間：{formatDate(order.delivery_time)}
                </p>
                {/* note 柚子沒有貨運單號 */}
                {/* <p className="mb-2 text-base">
                  貨運單號：
                  {order.tracking_number ? order.tracking_number : '未提供'}
                </p> */}
              </CardBody>
            </Card>

            <Card className="w-full lg:w-1/3">
              <CardHeader>
                <h5 className="text-base font-semibold">訂單商品</h5>
              </CardHeader>
              <CardBody>
                <ul>
                  {order.product_names.map((product: any, pIndex: any) => (
                    <li key={pIndex}>
                      ({pIndex + 1}) {product}{' '}
                      {order.product_quantities[pIndex]}{' '}
                      {order.product_units[pIndex]}
                    </li>
                  ))}
                </ul>
              </CardBody>
              <Divider />
              <CardFooter>
                <p className="mb-2 text-base">總價：{order.total_price}</p>
              </CardFooter>
            </Card>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button
              color="danger"
              className="mr-5"
              onClick={() => handleAskDelete(order.order_id)}
            >
              刪除訂單
            </Button>
            <Button
              color="primary"
              onClick={() =>
                handleAskEdit(
                  order.order_id,
                  order.status,
                  formatDate(order.delivery_time),
                  formatDate(order.expect_delivery_time),
                  order.tracking_number
                )
              }
            >
              編輯訂單
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}

export default OrderCard
