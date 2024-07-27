// 這個組件是渲染在主頁的文章列表

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  Chip
} from '@nextui-org/react'
import React from 'react'
import articlesList from '@/static/articlesList.json'
import Link from 'next/link'

const articles = articlesList.articles

const Article = () => {
  return (
    <div className="flex flex-wrap gap-10 ">
      {articles.map((article, index) => (
        <Card key={index} className="py-4">
          <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
            <Chip
              color={article.category === '植物二三事' ? 'success' : 'danger'}
              className="mb-3 text-tiny font-bold uppercase"
              variant="faded"
            >
              {article.category}
            </Chip>
            <h2 className="text-large font-bold">{article.title}</h2>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image src={article.img} alt={article.title} width={270} />
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              key={index}
              href={`/articles/${article.url}`}
              passHref
              scroll={false}
            >
              <Button>閱讀更多</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Article
