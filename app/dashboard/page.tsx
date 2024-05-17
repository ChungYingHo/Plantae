'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
  Input,
  Button
} from '@nextui-org/react'
const dummyData = [
  {
    name: '123',
    address: '123',
    phone: '123',
    email: '123',
    payment: '123',
    status: '123',
    orderCode: '123',
    totalPrice: '123',
    delivery_time: '123',
    expect_delivery_time: '123',
    tracking_number: '123',
    note: '123',
    created_at: '123',
    items: [
      {
        name: '123',
        quantity: '123'
      }
    ]
  }
]

const Page = () => {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-screen flex-wrap gap-5 overflow-y-scroll bg-slate-50 px-8 py-5 text-foreground-800 xl:px-24 2xl:px-48">
      {dummyData.map((order, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <h3 className="text-lg font-semibold">
              Order Code: {order.orderCode}
            </h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-sm font-semibold">Customer Information</p>
                <p>Name: {order.name}</p>
                <p>Address: {order.address}</p>
                <p>Phone: {order.phone}</p>
                <p>Email: {order.email}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Order Information</p>
                <p>Payment: {order.payment}</p>
                <p>Status: {order.status}</p>
                <p>Total Price: {order.totalPrice}</p>
                <p>Delivery Time: {order.delivery_time}</p>
                <p>Expect Delivery Time: {order.expect_delivery_time}</p>
                <p>Tracking Number: {order.tracking_number}</p>
                <p>Note: {order.note}</p>
              </div>
            </div>
            <Divider />
            <div>
              <p className="text-sm font-semibold">Items</p>
              <div className="grid grid-cols-2 gap-5">
                {order.items.map((item, index) => (
                  <div key={index}>
                    <p>Name: {item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button>View Detail</Button>
          </CardFooter>
        </Card>
      ))}
    </main>
  )
}

export default Page
