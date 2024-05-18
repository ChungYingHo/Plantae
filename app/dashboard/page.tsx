'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem
} from '@nextui-org/react'
import { getAllOrderData, deleteOrderData, updateStatus } from '@/lib/data'

function formatDate(isoDateString: string) {
  const date = new Date(isoDateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

const Page = () => {
  const [orderData, setOrderData] = useState<any[]>([])
  const [isDelete, setIsDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState<number>(0)
  const [currentOrderStatus, setCurrentOrderStatus] = useState<string>('')
  const [currentOrderExpectDeliveryTime, setCurrentOrderExpectDeliveryTime] =
    useState<string>('')
  const [currentOrderDeliveryTime, setCurrentOrderDeliveryTime] =
    useState<string>('')
  const [currentOrderTrackingNumber, setCurrentOrderTrackingNumber] =
    useState<string>('')

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const fetchData = async () => {
    try {
      const response = await getAllOrderData()
      console.log('Get all order data response', response)
      setOrderData(response)
    } catch (error) {
      console.error('Get all order data error', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // 刪除訂單
  const handleAskDelete = (id: number) => {
    setIsDelete(true)
    onOpen()
    setCurrentOrderId(id)
  }

  const handleDelete = async (orderId: number, func: any) => {
    try {
      setIsLoading(true)
      await deleteOrderData(orderId)
      console.log('Delete order data success')
      setIsLoading(false)
      // 重新取得訂單資料
      fetchData()

      func()
    } catch (error) {
      console.error('Delete order data error', error)
    }
  }

  // 編輯訂單
  const handleAskEdit = (
    id: number,
    status: any,
    deDate: any,
    exDeDate: any,
    trackNum: any
  ) => {
    setIsDelete(false)
    onOpen()
    setCurrentOrderId(id)
    setCurrentOrderStatus(status)
    setCurrentOrderExpectDeliveryTime(exDeDate)
    setCurrentOrderDeliveryTime(deDate)
    setCurrentOrderTrackingNumber(trackNum)
  }

  const handleEdit = async (func: any) => {
    try {
      const data = {
        orderId: currentOrderId,
        status: currentOrderStatus,
        deliveryTime: currentOrderDeliveryTime,
        expectDeliveryTime: currentOrderExpectDeliveryTime,
        trackingNumber: currentOrderTrackingNumber
      }

      console.log('Edit order data', data)

      setIsLoading(true)
      await updateStatus(data)
      console.log('Update order data success')
      setIsLoading(false)
      // 重新取得訂單資料
      fetchData()

      func()
    } catch (error) {
      console.error('Update order data error', error)
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-screen flex-wrap gap-5 overflow-y-scroll bg-slate-50 px-8 py-5 text-foreground-800 xl:px-24 2xl:px-48">
      {orderData.length > 0 ? (
        orderData.map((order: any) => (
          <Card key={order.order_id} className="w-full">
            <CardHeader className="flex flex-col items-start gap-1">
              <h4 className="text-base font-semibold">{order.order_code}</h4>
              <p className="text-sm">{formatDate(order.order_created_at)}</p>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-row gap-3">
              <Card className="w-1/3">
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

              <Card className="w-1/3">
                <CardHeader>
                  <h5 className="text-base font-semibold">訂單狀態</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-2 text-base">狀態：{order.status}</p>
                  <p className="mb-2 text-base">
                    預計運送時間：{formatDate(order.expect_delivery_time)}
                  </p>
                  <p className="mb-2 text-base">
                    運送時間：{formatDate(order.delivery_time)}
                  </p>
                  <p className="mb-2 text-base">
                    貨運單號：
                    {order.tracking_number ? order.tracking_number : '未提供'}
                  </p>
                </CardBody>
              </Card>

              <Card className="w-1/3">
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
                  <p className="mb-2 text-base">
                    總價：
                    {order.total_price}
                  </p>
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
        ))
      ) : (
        <p>目前沒有訂單數據</p>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isDelete ? '刪除訂單' : '編輯訂單'}
              </ModalHeader>
              <ModalBody>
                {isDelete ? (
                  <p>確定刪除訂單?</p>
                ) : (
                  <>
                    <Select
                      label="訂單狀態"
                      className="max-w-xs"
                      defaultSelectedKeys={[currentOrderStatus]}
                      onChange={(e) => setCurrentOrderStatus(e.target.value)}
                    >
                      <SelectItem value="訂單處理中" key="訂單處理中">
                        訂單處理中
                      </SelectItem>
                      <SelectItem value="備貨中" key="備貨中">
                        備貨中
                      </SelectItem>
                      <SelectItem value="已出貨" key="已出貨">
                        已出貨
                      </SelectItem>
                    </Select>
                    <Input
                      type="date"
                      label="預計運送時間"
                      value={currentOrderExpectDeliveryTime}
                      onChange={(e) =>
                        setCurrentOrderExpectDeliveryTime(
                          new Date(e.target.value).toISOString().split('T')[0]
                        )
                      }
                      isDisabled={
                        currentOrderStatus === '訂單處理中' ||
                        currentOrderStatus === '已出貨'
                      }
                    />
                    <Input
                      type="date"
                      label="運送時間"
                      value={currentOrderDeliveryTime}
                      onChange={(e) =>
                        setCurrentOrderDeliveryTime(
                          new Date(e.target.value).toISOString().split('T')[0]
                        )
                      }
                      isDisabled={currentOrderStatus !== '已出貨'}
                    />
                    <Input
                      type="text"
                      label="貨運單號"
                      value={currentOrderTrackingNumber}
                      onChange={(e) =>
                        setCurrentOrderTrackingNumber(e.target.value)
                      }
                      isDisabled={currentOrderStatus !== '已出貨'}
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  isLoading={isLoading}
                  onClick={
                    isDelete
                      ? () => handleDelete(currentOrderId, onClose)
                      : () => handleEdit(onClose)
                  }
                >
                  {isDelete ? '刪除' : '完成編輯'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  )
}

export default Page
