import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Link,
  CardFooter,
  Image,
  Chip,
  Input,
  Button
} from '@nextui-org/react'

const Page = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const size = 'md'

  // const handleOpen = () => {
  //   onOpen()
  // }

  const products = [
    {
      name: '黑香芒果',
      producer: '何春龍',
      area: '六甲區',
      color: 'success',
      img: '/product/black_mango.jpg',
      description: 'This is the brand image website of PLANTAE Taiwan.',
      unit: '10 斤/箱',
      price: 500
    },
    {
      name: '愛文芒果',
      producer: '何春龍',
      area: '六甲區',
      color: 'danger',
      img: '/product/love_mango.jpg',
      description: 'This is the brand image website of PLANTAE Taiwan.',
      unit: '10 斤/箱',
      price: 600
    }
    // {
    //   name: '綠香芒果',
    //   producer: '何春龍',
    //   area: '六甲區',
    //   color: 'danger',
    //   img: '/product/dry_mango.jpg',
    //   description: 'This is the brand image website of PLANTAE Taiwan.',
    //   unit: '10 斤/箱',
    //   price: 500
    // }
  ]
  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-screen flex-wrap gap-5 overflow-y-scroll bg-slate-50 px-8 py-5 text-foreground-800 xl:px-24 2xl:px-48">
      {products.map((product, index) => (
        <Card key={index} className="h-fit w-1/3">
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
            <p className="text-sm text-slate-500">價格: {product.price} 元</p>
          </CardBody>
          <CardFooter className="flex items-end justify-between gap-5">
            <Input
              type="number"
              label="數量"
              placeholder="0"
              labelPlacement="outside"
              min="0"
              className="w-2/3"
            />
            <Button color="secondary" className="w-1/3" variant="ghost">
              加入購物車
            </Button>
          </CardFooter>
        </Card>
      ))}
    </main>
  )
}

export default Page
