'use client'

import React, { useEffect, useRef } from 'react'
import MainPage from './components/main/MainPage'
import Article from './components/article/Article'

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

  // 載入頁面時，若 localStorage 存在 isBackFromArticle，則直接滾動到第二個 div並將 isBackFromArticle 改為 false
  useEffect(() => {
    if (localStorage.getItem('isBackFromArticle') === 'true') {
      scrollToSecondDiv()
      localStorage.setItem('isBackFromArticle', 'false')
    }
  })

  return (
    <main className="w-screen overflow-y-scroll bg-slate-50 text-foreground-800 2xl:h-[calc(100vh-4rem)] 2xl:snap-y 2xl:snap-mandatory">
      <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-slate-50 px-8 xl:px-24 2xl:h-[calc(100vh-4rem)] 2xl:snap-center 2xl:px-48">
        <div
          ref={particleRef}
          className="absolute left-0 top-0 h-[1.5px] w-[1.5px] animate-star rounded-full bg-transparent"
        />
        <MainPage scrollToSecondDiv={scrollToSecondDiv} />
      </div>

      <div
        ref={secondDivRef}
        id="modal-root"
        className="my-7 flex min-h-[calc(100vh-4rem)] w-full items-center bg-slate-50 px-8 xl:px-24 2xl:my-0 2xl:snap-start 2xl:px-48"
      >
        <Article />
      </div>
    </main>
  )
}
