import React from 'react'
import articlesList from '@/static/articlesList.json'
import SingleArticle from '../components/SingleArticle'

const articles = articlesList.articles

export const dynamicParams = false

export function generateStaticParams() {
  let slugs = articles.map((article) => article.url)
  return slugs.map((slug) => ({ url: slug }))
}

export default function Article({
  params: { url }
}: {
  params: { url: string }
}) {
  // 從 articlesList.json 中找到 url 對應的文章
  const index = articles.findIndex((article) => article.url === url)

  return <SingleArticle articles={articles} index={index} />
}
