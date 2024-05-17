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
// import { useState, useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from '@/lib/hooks'
// import { addToCart } from '@/lib/features/cart/cartSlice'

const Page = () => {
  const [isSearch, setIsSearch] = useState(false)
  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-screen flex-wrap gap-5 overflow-y-scroll bg-slate-50 px-8 py-5 text-foreground-800 xl:px-24 2xl:px-48">
      <Card className="h-fit w-full p-5">
        <CardHeader className="flex flex-row items-end gap-20">
          <Input
            type="text"
            label="訂單編號"
            placeholder="請輸入訂單編號進行查詢"
            variant="faded"
          />
          <Button color="secondary" variant="ghost">
            查詢
          </Button>
        </CardHeader>
        <Divider />
        <CardBody>
          {!isSearch ? (
            <p>尚未有查詢資料</p>
          ) : (
            <div className="flex flex-col gap-3">
              <Input type="text" label="訂單編號" variant="faded" isReadOnly />
              <Input type="text" label="訂單狀態" variant="faded" isReadOnly />
              <Input type="text" label="貨運單號" variant="faded" isReadOnly />
              <Input label="寄送日期" variant="faded" isReadOnly />
              <Input type="text" label="收件人" variant="faded" isReadOnly />
              <Input type="text" label="收件電話" variant="faded" isReadOnly />
              <Input type="text" label="收件信箱" variant="faded" isReadOnly />
              <Input type="text" label="收件地址" variant="faded" isReadOnly />
            </div>
          )}
        </CardBody>
      </Card>
    </main>
  )
}

export default Page
