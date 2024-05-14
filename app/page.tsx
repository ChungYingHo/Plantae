'use client'

import React, { useEffect, useRef } from 'react'
import MainPage from './components/main/MainPage'

const numShadows = 700

const generateParticle = (numShadows: number): string => {
  let boxShadowValue = ''

  for (let i = 0; i < numShadows; i++) {
    boxShadowValue += `${Math.random() * 2000}px ${Math.random() * 2000}px #4f6036, `
  }

  // 移除最後一個逗號和空格
  boxShadowValue = boxShadowValue.slice(0, -2)

  return boxShadowValue
}

export default function Home() {
  const particleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const boxShadow = generateParticle(numShadows)
    if (particleRef.current) {
      particleRef.current.style.boxShadow = boxShadow
    }
  }, [])

  const secondDivRef = useRef<HTMLDivElement>(null)

  const scrollToSecondDiv = () => {
    if (secondDivRef.current) {
      secondDivRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="text-foreground-800 w-screen overflow-y-scroll bg-slate-50 2xl:h-[calc(100vh-4rem)] 2xl:snap-y 2xl:snap-mandatory">
      <div className="flex w-full items-center justify-center bg-slate-50 px-8 xl:min-h-[calc(100vh-4rem)] xl:px-24 2xl:h-[calc(100vh-4rem)] 2xl:snap-center 2xl:px-48">
        <div
          ref={particleRef}
          className="animate-star absolute left-0 top-0 h-[1.5px] w-[1.5px] rounded-full bg-transparent"
        />
        <MainPage scrollToSecondDiv={scrollToSecondDiv} />
      </div>
      <div
        ref={secondDivRef}
        className="my-7 flex w-full items-center bg-gray-600 px-8 xl:px-24 2xl:my-0 2xl:h-[200vh] 2xl:snap-start 2xl:px-48"
      >
        <p>2</p>
      </div>
    </main>
  )
}
