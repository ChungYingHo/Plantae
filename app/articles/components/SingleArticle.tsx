'use client'

import { Divider, Image, Button, Chip } from '@nextui-org/react'
import React from 'react'

import { useRouter } from 'next/navigation'
import articlesList from '@/static/articlesList.json'

interface SingleArticleProps {
  articles: typeof articlesList.articles
  index: number
}

export default function SingleArticle({ articles, index }: SingleArticleProps) {
  console.log('index', index)

  const router = useRouter()

  const handleBack = () => {
    router.back()

    // localStorage 存入 isBackFromArticle 為 true
    localStorage.setItem('isBackFromArticle', 'true')
  }

  return (
    <div className="mx-auto w-3/4 pb-10 2xl:w-1/3">
      <div className="my-5 flex justify-start">
        <Button color="success" variant="flat" onClick={handleBack}>
          ← 返回文章列表
        </Button>
      </div>
      <div className="my-5 flex flex-col gap-2 2xl:flex-row 2xl:gap-5">
        <Chip className="text-sm font-bold uppercase" color="warning">
          {articles[index].category}
        </Chip>
        <h2 className="text-2xl font-bold">{articles[index].title}</h2>
      </div>
      <Divider />
      <div className="my-5 flex justify-center">
        <Image
          src={articles[index].img}
          alt={articles[index].title}
          width={270}
        />
      </div>

      {articles[index].paragraphs.map(
        (
          paragraph: { lines: any[] },
          paragraphIndex: React.Key | null | undefined
        ) => (
          <div key={paragraphIndex} className="py-2">
            {paragraph.lines.map(
              (
                line:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined,
                lineIndex: React.Key | null | undefined
              ) => (
                <p key={lineIndex} className="text-base font-semibold">
                  {line}
                </p>
              )
            )}
          </div>
        )
      )}
    </div>
  )
}
