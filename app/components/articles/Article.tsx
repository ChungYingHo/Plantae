import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import React from 'react'

const articles = [
  {
    title: '母親節與康乃馨',
    category: '植物二三事',
    img: '/article/mothers_day.png',
    paragraphs: [
      {
        lines: [
          '今天是母親節，是一個為了感謝母親的辛勞而慶祝的節日。',
          '在這天，人們會贈送康乃馨給自己的母親，然而為什麼康乃馨會代表母親節呢？'
        ]
      },
      {
        lines: [
          '康乃馨屬於石竹科石竹屬，為長日照植物，是世界上最為普遍運用的花卉之一，它的花瓣盛開時如波浪狀。',
          '康乃馨包括許多變種以及雜交種，除了常見的紅色和白色之外，同時也有鑲邊或是雙色的品種。',
          '而康乃馨的花語為「愛」，不同顏色的康乃馨有不一樣的花語。白色的康乃馨為純潔的愛；而紅色則為熱烈的愛。'
        ]
      },
      {
        lines: [
          '1907年，有位名叫Anna Jarvis 的人為了紀念過世的母親，以母親過世的日子以及最愛的康乃馨來紀念，這便是為什麼母親節為五月第二個星期天以及要贈送康乃馨的理由。',
          '因此就趁今天好好地向母親表示感謝吧！'
        ]
      }
    ]
  }
]

const Article = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const size = '2xl'

  const handleOpen = () => {
    onOpen()
  }
  return (
    <div>
      {articles.map((article, index) => (
        <Card key={index} className="py-4">
          <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
            <p className="text-tiny font-bold uppercase">{article.category}</p>
            <h2 className="text-large font-bold">{article.title}</h2>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image src={article.img} alt={article.title} width={270} />
          </CardBody>
          <Divider />
          <CardFooter>
            <Button onPress={handleOpen}>閱讀更多</Button>
            <Modal
              size={size}
              isOpen={isOpen}
              onClose={onClose}
              scrollBehavior="inside"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      <p className="text-tiny font-bold uppercase">
                        {article.category}
                      </p>
                      <h2 className="text-large font-bold">{article.title}</h2>
                    </ModalHeader>
                    <ModalBody>
                      {article.paragraphs.map((paragraph, index) => (
                        <div key={index} className="py-2">
                          {paragraph.lines.map((line, index) => (
                            <p key={index}>{line}</p>
                          ))}
                        </div>
                      ))}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Article
