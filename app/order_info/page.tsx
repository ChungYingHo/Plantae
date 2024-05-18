'use client'

import Link from 'next/link'
import { Key, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
  Input,
  Button
} from '@nextui-org/react'
import { getSearchData } from '@/lib/data'

function formatDate(isoDateString: string) {
  console.log('isoDateString', isoDateString)
  const date = new Date(isoDateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

const Page = () => {
  const [isSearch, setIsSearch] = useState(false)
  const [orderCode, setOrderCode] = useState('')
  const [isLoad, setIsLoad] = useState(false)
  const [searchData, setSearchData] = useState({})
  const [displayMsg, setDisplayMsg] = useState('尚未有查詢資料')

  const handleSearch = async () => {
    try {
      setIsLoad(true)
      const response = await getSearchData(orderCode.trim())
      setIsLoad(false)
      setIsSearch(true)
      console.log('response', response)
      setSearchData(response)
    } catch (error) {
      setIsLoad(false)
      console.error('Search order error', error)
      setDisplayMsg('查無此訂單貨系統異常，請聯絡植宇宙小編')
    }
  }
  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-screen flex-wrap gap-5 overflow-y-scroll bg-slate-50 px-4 py-5 text-foreground-800 xl:px-24 2xl:px-48">
      <Card className="h-fit w-full p-5">
        <CardHeader className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-20">
          <Input
            type="text"
            label="訂單編號"
            placeholder="請輸入訂單編號進行查詢"
            variant="faded"
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
          />
          <Button
            color="secondary"
            variant="ghost"
            onClick={handleSearch}
            isLoading={isLoad}
          >
            查詢
          </Button>
        </CardHeader>
        <Divider />
        <CardBody>
          {!isSearch ? (
            <p>{displayMsg}</p>
          ) : (
            <div className="flex flex-col gap-3">
              <Input
                type="text"
                label="訂單編號"
                variant="faded"
                isReadOnly
                // @ts-ignore
                value={searchData.userInfo.order_code}
              />
              <Input
                type="text"
                label="訂單狀態"
                variant="faded"
                isReadOnly
                // @ts-ignore
                value={searchData.userInfo.status}
              />
              {/* @ts-ignore */}
              {searchData.userInfo.status === '已出貨' && (
                <Input
                  type="text"
                  label="貨運單號"
                  variant="faded"
                  isReadOnly
                  // @ts-ignore
                  value={searchData.userInfo.tracking_number}
                />
              )}

              {/* @ts-ignore */}
              {searchData.userInfo.status !== '訂單處理中' && (
                <Input
                  type="date"
                  label={
                    // @ts-ignore
                    searchData.userInfo.status === '已出貨'
                      ? '送達時間'
                      : '預計送達時間'
                  }
                  variant="faded"
                  isReadOnly
                  // @ts-ignore
                  value={
                    // @ts-ignore
                    searchData.userInfo.status === '已出貨'
                      ? // @ts-ignore
                        formatDate(searchData.userInfo.delivery_time)
                      : // @ts-ignore
                        formatDate(searchData.userInfo.expect_delivery_time)
                  }
                />
              )}

              <Input
                type="text"
                label="收件人"
                variant="faded"
                isReadOnly
                // @ts-ignore
                value={searchData.userInfo.name}
              />
              <Input
                type="text"
                label="收件電話"
                variant="faded"
                isReadOnly
                // @ts-ignore
                value={searchData.userInfo.phone}
              />
              <Input
                type="text"
                label="收件信箱"
                variant="faded"
                isReadOnly
                value={
                  // @ts-ignore
                  searchData.userInfo.email
                    ? // @ts-ignore
                      searchData.userInfo.email
                    : '您未提供 Email'
                }
              />
              <Input
                type="text"
                label="收件地址"
                variant="faded"
                isReadOnly
                // @ts-ignore
                value={searchData.userInfo.address}
              />
              <Card>
                <CardHeader>訂購商品</CardHeader>
                <CardBody>
                  <div className="flex flex-col gap-3">
                    {/* @ts-ignore */}
                    {searchData.productsInfo.map(
                      (
                        product: {
                          name:
                            | string
                            | (readonly string[] & string)
                            | undefined
                          quantity:
                            | string
                            | (readonly string[] & string)
                            | undefined
                        },
                        index: Key | null | undefined
                      ) => (
                        <div key={index} className="flex flex-row gap-3">
                          <Input
                            type="text"
                            label="商品名稱"
                            variant="faded"
                            isReadOnly
                            value={product.name}
                          />
                          <Input
                            type="text"
                            label="數量"
                            variant="faded"
                            isReadOnly
                            value={product.quantity}
                          />
                        </div>
                      )
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </CardBody>
      </Card>
    </main>
  )
}

export default Page
