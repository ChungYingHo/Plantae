'use client'

import { useState, useEffect } from 'react'
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Tabs,
  Tab
} from '@nextui-org/react'
import {
  getAllOrderData,
  deleteOrderData,
  updateStatus,
  getProductQuantity
} from '@/lib/data'
import OrderCard from './components/OrderCard'

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
  const [preOrderData, setPreOrderData] = useState<any[]>([])
  const [preSendOrderData, setPreSendOrderData] = useState<any[]>([])
  const [sendOrderData, setSendOrderData] = useState<any[]>([])
  const [productQuantity, setProductQuantity] = useState<any[]>([])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const fetchData = async () => {
    try {
      const response = await getAllOrderData()
      const quantityResponse = await getProductQuantity()

      console.log('Get all order data response', response)
      console.log('Get all product quantity response', quantityResponse)

      setOrderData(response)
      setPreOrderData(response.filter((order) => order.status === '訂單處理中'))
      setPreSendOrderData(response.filter((order) => order.status === '備貨中'))
      setSendOrderData(response.filter((order) => order.status === '已出貨'))
      setProductQuantity(quantityResponse)
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
    <main className="flex min-h-[calc(100vh-4rem)] w-screen flex-col flex-wrap gap-5 overflow-y-scroll bg-slate-50 px-8 py-5 text-foreground-800 xl:px-24 2xl:px-48">
      <Tabs>
        <Tab key="total" title="全部訂單">
          <p className="mb-5">訂單總數：{orderData.length}</p>
          {orderData.length > 0 ? (
            <OrderCard
              orderData={orderData}
              handleAskDelete={handleAskDelete}
              handleAskEdit={handleAskEdit}
            />
          ) : (
            <p>目前沒有訂單數據</p>
          )}
        </Tab>
        <Tab key="pre" title="訂單處理中">
          <p className="mb-5">未確認訂單總數：{preOrderData.length}</p>
          {preOrderData.length > 0 ? (
            <OrderCard
              orderData={preOrderData}
              handleAskDelete={handleAskDelete}
              handleAskEdit={handleAskEdit}
            />
          ) : (
            <p>目前沒有訂單處理中</p>
          )}
        </Tab>
        <Tab key="preSend" title="備貨中">
          <p className="mb-5">備貨中訂單總數：{preSendOrderData.length}</p>
          {preSendOrderData.length > 0 ? (
            <OrderCard
              orderData={preSendOrderData}
              handleAskDelete={handleAskDelete}
              handleAskEdit={handleAskEdit}
            />
          ) : (
            <p>目前沒有備貨中</p>
          )}
        </Tab>
        <Tab key="send" title="已出貨">
          <p className="mb-5">已出貨訂單總數：{sendOrderData.length}</p>
          {sendOrderData.length > 0 ? (
            <OrderCard
              orderData={sendOrderData}
              handleAskDelete={handleAskDelete}
              handleAskEdit={handleAskEdit}
            />
          ) : (
            <p>目前沒有已出貨</p>
          )}
        </Tab>
        <Tab key="product" title="商品數量">
          {productQuantity.length > 0 ? (
            <>
              {productQuantity.map((product) => (
                <Input
                  key={product.name}
                  type="text"
                  label={product.name}
                  value={product.quantity}
                  isReadOnly
                  className="mb-5"
                />
              ))}
            </>
          ) : (
            <p>目前沒有商品數量</p>
          )}
        </Tab>
      </Tabs>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
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
                    {/* <Input
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
                    /> */}
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
                    {/* note 柚子沒有貨運單號 */}
                    {/* <Input
                      type="text"
                      label="貨運單號"
                      value={currentOrderTrackingNumber}
                      onChange={(e) =>
                        setCurrentOrderTrackingNumber(e.target.value)
                      }
                      isDisabled={currentOrderStatus !== '已出貨'}
                    /> */}
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
