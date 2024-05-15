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
  Button,
  Textarea
} from '@nextui-org/react'

const Page = () => {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-screen flex-wrap gap-5 overflow-x-hidden bg-slate-50 px-8 py-5 text-foreground-800 xl:px-24 2xl:px-48">
      <Card className="h-fit w-full p-5">
        <CardHeader className="flex w-full items-center justify-between">
          <h2 className="text-lg font-bold">訂單明細</h2>
        </CardHeader>
        <CardBody className="flex w-full flex-wrap gap-3">
          {/* 姓名 */}
          <Input
            type="text"
            placeholder="請輸入收件人姓名"
            label="收件人"
            isRequired
            variant="faded"
          />
          {/* 電話 */}
          <Input
            type="tel"
            placeholder="請輸入收件人電話"
            label="電話"
            isRequired
            variant="faded"
          />
          {/* email */}
          <Input
            type="Email"
            placeholder="輸入收件人Email，我們將會寄送訂單通知給收件人"
            label="Email"
            variant="faded"
          />
          {/* 地址 */}
          <Input
            type="text"
            placeholder="請輸入收件地址"
            label="地址"
            isRequired
            variant="faded"
          />
          {/* 匯款備註 */}
          <Input
            type="text"
            placeholder="請填寫匯款後五碼"
            label="匯款備註"
            isRequired
            variant="faded"
          />
          {/* 備註 */}
          <Textarea
            placeholder="有任何需求都可以留言給我們喔~"
            label="備註"
            variant="faded"
          />
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-end">
          <Button>送出訂單</Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default Page
