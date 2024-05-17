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
  useDisclosure
} from '@nextui-org/react'
import { getAllOrderData, deleteOrderData } from '@/lib/data'

function formatDate(isoDateString: string) {
  const date = new Date(isoDateString)
  const formattedDate = date.toISOString().split('T')[0] // 2024-04-19
  return formattedDate
}

const Page = () => {
  const [orderData, setOrderData] = useState<any[]>([])
  const [isDelete, setIsDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState<number>(0)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllOrderData()
        console.log('Get all order data response', response)
        setOrderData(response)
      } catch (error) {
        console.error('Get all order data error', error)
      }
    }

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

      func()
    } catch (error) {
      console.error('Delete order data error', error)
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
                    預計運送時間：{order.expect_delivery_time}
                  </p>
                  <p className="mb-2 text-base">
                    運送時間：{order.delivery_time}
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
              <Button color="primary">編輯訂單</Button>
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
                Modal Title
              </ModalHeader>
              <ModalBody>
                {isDelete ? <p>確定刪除訂單?</p> : <p>Modal Body</p>}
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
                      : onClose
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
