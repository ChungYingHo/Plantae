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
    name: '老欉麻豆文旦-10斤',
    producer: '陳丁壆',
    area: '麻豆區',
    color: 'success',
    img: '/product/pomelo-10.jpg',
    description:
      '老欉文旦為柚子中的珍品，果皮薄而易剝，果肉緊實多汁，甜中帶酸，香氣四溢。在地種植獨一無二的香甜風味與細膩口感。',
    unit: '10 斤/箱',
    price: '700 (本島含運費)',
    date: '9/3 起陸續出貨'
  },
  {
    name: '老欉麻豆文旦-20斤',
    producer: '陳丁壆',
    area: '麻豆區',
    color: 'danger',
    img: '/product/pomelo-20.jpg',
    description:
      '老欉柚樹歷經歲月洗禮，結出的果實更加醇厚飽滿。而20斤裝文旦更是節日送禮、公司行號的不二之選。',
    unit: '20 斤/箱',
    price: '1320 (本島含運費)',
    date: '9/3 起陸續出貨'
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
      dispatch(addToCart({ name, quantity, unit }))
    }
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
              className="mx-auto aspect-square w-[80%] object-contain"
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
            <p className="mb-1 text-sm text-slate-500">
              生產者: {product.producer}
            </p>
            <p className="mb-1 text-sm text-slate-500">產地: {product.area}</p>

            {/* <p className="mb-1 text-sm text-slate-500">單位: {product.unit}</p>
            <p className="mb-1 text-sm text-slate-500">價格: {product.price}</p> */}
            <p className="mb-1 text-sm text-slate-500 ">
              預計出貨時間: {product.date}
            </p>
            <p className="mb-1 text-sm text-slate-500 ">
              售價: {product.price}
            </p>
            {/* <p className="text-sm text-pink-500">
              感謝各位大力支持，2024 芒果已預購結束~
              今年錯過的朋友們可以期待一下明年囉！
            </p> */}
          </CardBody>
          <CardFooter className="flex items-end justify-between gap-5">
            <Input
              type="number"
              label="數量"
              labelPlacement="outside"
              min="0"
              className="w-2/3"
              value={(quantities[product.name] || '').toString()} // Convert the number value to a string
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
