'use client'

import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Link,
  CardFooter,
  Input,
  Button,
  Textarea
} from '@nextui-org/react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { updateQuantity, removeFromCart } from '@/lib/features/cart/cartSlice'

const Page = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [payment, setPayment] = useState('')
  const [note, setNote] = useState('')

  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart.items)
  console.log(cart)

  const handleSubmit = () => {
    alert(
      `${cart[0].name} has been ordered! Amount: ${cart[0].quantity}! ${name}! ${phone}! ${email}! ${address}! ${payment}! ${note}!`
    )
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-screen flex-col flex-wrap gap-5 overflow-x-hidden bg-slate-50 px-8 py-5 text-foreground-800 xl:px-24 2xl:px-48">
      <Card className="h-fit w-full p-5">
        <CardHeader className="flex w-full items-center justify-between">
          <h2 className="text-lg font-bold">訂單明細</h2>
        </CardHeader>
        <CardBody className="flex w-full flex-wrap gap-3">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <Card key={index} className="w-full">
                <CardBody className="flex flex-row items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold">{item.name}</h3>
                    <p className="text-sm text-foreground-500">{item.unit}</p>
                  </div>
                  <div className="flex w-1/2 items-center gap-3">
                    <Input
                      type="number"
                      label="數量"
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
                總金額: $
                {cart.reduce((acc, item) => acc + item.quantity, 0) * 600}
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
          />
          {/* 電話 */}
          <Input
            type="tel"
            placeholder="請輸入收件人電話"
            label="電話"
            isRequired
            variant="faded"
            onChange={(e) => setPhone(e.target.value)}
          />
          {/* email */}
          <Input
            type="Email"
            placeholder="輸入收件人Email，我們將會寄送訂單通知給收件人"
            label="Email"
            variant="faded"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* 地址 */}
          <Input
            type="text"
            placeholder="請輸入收件地址"
            label="地址"
            isRequired
            variant="faded"
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* 匯款備註 */}
          <Input
            type="text"
            placeholder="請填寫匯款後五碼"
            label="匯款備註"
            isRequired
            variant="faded"
            onChange={(e) => setPayment(e.target.value)}
          />
          {/* 備註 */}
          <Textarea
            placeholder="有任何需求都可以留言給我們喔~"
            label="備註"
            variant="faded"
            onChange={(e) => setNote(e.target.value)}
          />
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-end">
          <Button color="success" onClick={handleSubmit}>
            送出訂單
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default Page
