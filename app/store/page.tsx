'use client'

import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
  Image,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addToCart } from '@/lib/features/cart/cartSlice'

const products = [
  {
    name: '黑香芒果',
    producer: '何春龍',
    area: '六甲區',
    color: 'success',
    img: '/product/black_mango.jpg',
    description: 'This is the brand image website of PLANTAE Taiwan.',
    unit: '10 斤/箱',
    price: '700 (含運費)'
  },
  {
    name: '愛文芒果',
    producer: '何春龍',
    area: '六甲區',
    color: 'danger',
    img: '/product/love_mango.jpg',
    description: 'This is the brand image website of PLANTAE Taiwan.',
    unit: '10 斤/箱',
    price: '700 (含運費)'
  }
]

const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const cart = useAppSelector((state) => state.cart.items)
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [displayMsg, setDisplayMsg] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const handleQuantityChange = (name: string, quantity: number) => {
    setQuantities({
      ...quantities,
      [name]: quantity
    })
  }

  const handleAddToCart = (name: string, unit: string) => {
    const quantity = quantities[name] || 0
    if (quantity <= 0) {
      setDisplayMsg('請輸入數量')
      setIsDisabled(true)
    } else {
      setDisplayMsg('加入購物車成功')
      setIsDisabled(false)
    }
    dispatch(addToCart({ name, quantity, unit }))
    console.log('addToCart:', { name, quantity, unit })
    onOpen()
  }

  const handleGoToCart = (func: any) => {
    router.push('/shopping_cart')
    func()
  }

  useEffect(() => {
    console.log('cart:', cart)
  }, [cart])

  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-screen flex-wrap gap-5 overflow-y-scroll bg-slate-50 px-8 py-5 text-foreground-800 xl:px-24 2xl:px-48">
      {products.map((product, index) => (
        <Card key={index} className="h-fit w-full lg:w-1/3">
          <CardHeader>
            <Image
              src={product.img}
              alt={product.name}
              className="mx-auto w-[80%] object-contain"
            />
          </CardHeader>
          <Divider />

          <CardBody>
            <p className="text-base font-extrabold text-slate-700">
              {product.name}
            </p>
            <p className="mb-3 text-sm font-bold text-slate-600">
              {product.description}
            </p>
            <p className="text-sm text-slate-500">生產者: {product.producer}</p>
            <p className="text-sm text-slate-500">產地: {product.area}</p>
            <p className="text-sm text-slate-500">單位: {product.unit}</p>
            <p className="text-sm text-slate-500">價格: {product.price}</p>
          </CardBody>
          <CardFooter className="flex items-end justify-between gap-5">
            <Input
              type="number"
              label="數量"
              placeholder="0"
              labelPlacement="outside"
              min="0"
              className="w-2/3"
              value={(quantities[product.name] || 0).toString()} // Convert the number value to a string
              onChange={(e) =>
                handleQuantityChange(product.name, parseInt(e.target.value))
              }
            />
            <Button
              color="secondary"
              className="w-1/3"
              variant="ghost"
              onPress={() => handleAddToCart(product.name, product.unit)}
            >
              加入購物車
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isDisabled ? '未選擇商品' : '加入購物車成功'}
              </ModalHeader>
              <ModalBody>
                <p>{displayMsg}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="secondary"
                  onPress={() => handleGoToCart(onClose)}
                  isDisabled={isDisabled}
                  variant="ghost"
                >
                  前往購物車
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
