'use client'

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

const Page = () => {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-screen flex-wrap gap-5 overflow-y-scroll bg-slate-50 px-8 py-5 text-foreground-800 xl:px-24 2xl:px-48">
      {/* login page */}
      <Card className="w-full">
        <CardHeader>
          <h3 className="text-lg font-semibold">Login</h3>
        </CardHeader>
        <CardBody>
          <Input label="Email" placeholder="Email" />
          <Input label="Password" placeholder="Password" type="password" />
        </CardBody>
        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default Page
