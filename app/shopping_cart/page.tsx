'use client'

import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
  Input,
  Button,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Snippet
} from '@nextui-org/react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  updateQuantity,
  removeFromCart,
  clearCart
} from '@/lib/features/cart/cartSlice'
import { postOrderData } from '@/lib/data'
import Rule from './components/Rule'

const generateUavCode = (): string => {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0].replace(/-/g, '') // 將日期格式化為YYYYMMDD
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomStr = ''
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)

    randomStr += chars[randomIndex]
  }

  return `${dateStr}-${randomStr}`
}

const Page = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [payment, setPayment] = useState('')
  const [note, setNote] = useState('')
  const [displayOrderCode, setDisplayOrderCode] = useState('')

  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart.items)
  console.log(cart)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [displayMsg, setDisplayMsg] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const [isCancelDisabled, setIsCancelDisabled] = useState(false)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
  const [isLoad, setIsLoad] = useState(false)

  const handleSubmit = async (step: string, func?: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // 驗證email格式
    setIsCancelDisabled(false)
    setIsSubmitSuccess(false)

    // check modal
    if (step === 'check') {
      if (
        name.trim().length < 2 ||
        phone.trim().length < 7 ||
        !address ||
        !payment ||
        (!emailRegex.test(email.trim()) && email.trim().length > 0)
      ) {
        console.log('請填寫完整資料')
        console.log(
          name.trim().length,
          phone.trim().length,
          emailRegex.test(email.trim()),
          address,
          payment
        )
        setDisplayMsg('請填寫完整資料')
        setIsDisabled(true)
        onOpen()
        return
      } else {
        console.log('確認資料')
        setDisplayMsg(
          `姓名: ${name}\n電話: ${phone}\nEmail: ${email}\n地址: ${address}\n匯款後五碼: ${payment}\n備註: ${note}`
        )
        setIsDisabled(false)
        onOpen()
        return
      }
    }

    // submit
    if (step === 'submit') {
      // 生成訂單編號
      const orderCode = generateUavCode()
      setDisplayOrderCode(orderCode)

      const outputData = {
        name: name,
        phone: phone,
        email: email,
        address: address,
        payment: payment,
        note: note,
        orderCode: orderCode,
        totalPrice: totalPrice,
        items: cart
      }
      // api will be here
      try {
        console.log('outputData', outputData)
        setIsLoad(true)
        const response = await postOrderData(outputData)
        console.log('postOrderData response', response)
        setIsLoad(false)
        setIsSubmitSuccess(true)
        setIsCancelDisabled(true)
        setDisplayMsg('訂單已送出')
      } catch (error) {
        console.error('postOrderData error', error)
        setIsSubmitSuccess(false)
        setDisplayMsg('訂單送出失敗，請聯繫我們')
      }
    }

    // clear cart
    if (step === 'clear') {
      // reset all state
      setName('')
      setPhone('')
      setEmail('')
      setAddress('')
      setPayment('')
      setNote('')
      setDisplayOrderCode('')
      setDisplayMsg('')
      setIsDisabled(false)
      setIsCancelDisabled(false)
      setIsSubmitSuccess(false)
      setIsLoad(false)

      dispatch(clearCart())
      func()
    }
  }

  // note calculate total price
  let totalPrice = 0
  // first product price is 700, second product price is 1320
  if (cart.length > 0) {
    cart.forEach((item) => {
      if (item.name === '老欉麻豆文旦-10斤') {
        totalPrice += item.quantity * 700
      } else if (item.name === '老欉麻豆文旦-20斤') {
        totalPrice += item.quantity * 1320
      }
    })
  }
  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-screen flex-col flex-wrap gap-5 overflow-x-hidden bg-slate-50 px-4 py-5 text-foreground-800 xl:px-24 2xl:px-48">
      <Card className="h-fit w-full p-5">
        <CardHeader className="flex w-full items-center justify-between">
          <h2 className="text-lg font-bold">訂單明細</h2>
        </CardHeader>
        <CardBody className="flex w-full flex-wrap gap-3">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <Card key={index} className="w-full">
                <CardBody className="flex flex-col items-start justify-between lg:flex-row lg:items-center">
                  <div>
                    <h3 className="text-base font-bold">{item.name}</h3>
                    <p className="text-sm text-foreground-500">{item.unit}</p>
                  </div>
                  <div className="flex w-full items-center gap-3 lg:w-1/2">
                    <Input
                      type="number"
                      label="數量"
                      variant="faded"
                      value={item.quantity.toString()}
                      onChange={(e) => {
                        const quantity = parseInt(e.target.value)
                        if (quantity === 0) {
                          dispatch(removeFromCart({ name: item.name }))
                        } else {
                          dispatch(
                            updateQuantity({
                              name: item.name,
                              quantity: quantity
                            })
                          )
                        }
                      }}
                    />
                    <Button
                      color="danger"
                      variant="ghost"
                      onClick={() =>
                        dispatch(removeFromCart({ name: item.name }))
                      }
                    >
                      刪除
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <p className="text-lg font-bold">購物車是空的</p>
          )}
        </CardBody>
        {cart.length > 0 && (
          <>
            <Divider />
            <CardFooter className="flex justify-end">
              <h2 className="text-lg font-bold">
                總金額: $ {totalPrice.toLocaleString()}
              </h2>
            </CardFooter>
          </>
        )}
      </Card>
      <Card className="h-fit w-full p-5">
        <CardHeader className="flex w-full items-center justify-between">
          <h2 className="text-lg font-bold">寄送資訊</h2>
        </CardHeader>
        <CardBody className="flex w-full flex-wrap gap-3">
          {/* 姓名 */}
          <Input
            type="text"
            placeholder="請輸入收件人姓名"
            label="收件人"
            isRequired
            variant="faded"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {/* 電話 */}
          <Input
            type="tel"
            placeholder="請輸入收件人電話"
            label="電話"
            isRequired
            variant="faded"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          {/* email */}
          <Input
            type="Email"
            placeholder="輸入收件人Email，我們將會寄送訂單通知給收件人"
            label="Email"
            variant="faded"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {/* 地址 */}
          <Input
            type="text"
            placeholder="請輸入收件地址"
            label="地址"
            isRequired
            variant="faded"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          {/* 匯款備註 */}
          <Input
            type="text"
            placeholder="ex: 12345 小明"
            label="匯款後五碼以及姓名 (請務必填寫清楚)"
            isRequired
            variant="faded"
            onChange={(e) => setPayment(e.target.value)}
            value={payment}
          />
          {/* 備註 */}
          <Textarea
            placeholder="有任何需求都可以留言給我們喔~"
            label="備註"
            variant="faded"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-end">
          <Rule />
          <Button
            color="secondary"
            variant="ghost"
            onClick={() => handleSubmit('check')}
            isDisabled={cart.length === 0}
          >
            確認訂單
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {isSubmitSuccess ? (
                      <>
                        <h2 className="text-lg font-bold">訂單已送出</h2>
                        <p className="text-sm text-foreground-500">
                          請複製訂單編號
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-lg font-bold">確認資料</h2>
                        <p className="text-sm text-foreground-500">
                          請確認以下資料是否正確
                        </p>
                      </>
                    )}
                  </ModalHeader>
                  <Divider />
                  <ModalBody>
                    {isSubmitSuccess ? (
                      <Snippet hideSymbol>{displayOrderCode}</Snippet>
                    ) : (
                      <p className="mb-2">
                        {displayMsg.split('\n').map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      isDisabled={isCancelDisabled}
                    >
                      取消
                    </Button>
                    <Button
                      color="success"
                      variant="light"
                      isLoading={isLoad}
                      onPress={
                        isCancelDisabled
                          ? () => handleSubmit('clear', onClose)
                          : () => handleSubmit('submit')
                      }
                      isDisabled={isDisabled}
                    >
                      {isCancelDisabled ? '確認' : '確認送出'}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </CardFooter>
      </Card>
    </main>
  )
}

export default Page
