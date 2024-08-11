import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Snippet
} from '@nextui-org/react'

const Rule = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    defaultOpen: true
  })
  return (
    <>
      <Button onPress={onOpen} color="warning" className="mr-5">
        宅配 & 付款規則
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                宅配 & 付款規則
              </ModalHeader>
              <ModalBody>
                <p className="text-base font-bold">宅配規則</p>
                <ol>
                  <li>1. 出貨日為週一到週四，訂單狀態可至訂單查詢檢視。</li>
                  <li>
                    2. 關於出貨狀態，可以至訂單查詢處查詢，預計從
                    <b>9 月 3 日</b>起陸續出貨喔。
                  </li>
                  <li>
                    3.
                    運送時間依宅配公司為主，本次因由農民伯伯直接出貨，故無貨運追蹤號碼。
                  </li>
                  <li>4. 有填寫 Email 者，出貨會由植宇宙小編透過信箱通知。</li>
                  <li>5. 如有特殊需求，請於備註欄填寫。</li>
                  <li>6. 如有單筆大量訂購，可在臉書粉專或 IG 與我們聯繫。</li>
                </ol>
                <p className="text-base font-bold">付款規則</p>
                <ol>
                  <li>1. 目前支付方式為匯款，並採先匯款先出貨制。</li>
                  <li>
                    2. 植宇宙匯款帳號為：
                    <Snippet className="text-lime-600" size="sm" symbol="">
                      822-358540783380
                    </Snippet>
                    。
                  </li>
                  <li>
                    3. 匯款時，請在匯款備註您的帳號後五碼以及<b>您的名字</b>
                    ，以利後續作業。
                  </li>
                  <li>
                    4.
                    如有相關問題，可至植宇宙粉專詢問，我們的夥伴樂意為您解說。
                  </li>
                </ol>
                <p className="text-base font-bold text-red-400">
                  商品價格已含運費，採收日期可以關注植宇宙粉專及ＩＧ，我們會不定時分享水果採收及裝箱的資訊～
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="light" onPress={onClose}>
                  我理解了！
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Rule
