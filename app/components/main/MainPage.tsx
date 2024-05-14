import styles from './mainpage.module.scss'
import { Button } from '@nextui-org/react'

interface MainPageProps {
  scrollToSecondDiv: () => void
}

const MainPage = ({ scrollToSecondDiv }: MainPageProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className={styles.mask}></div>
      <p className="index-text text-center text-xl font-medium text-slate-600">
        植宇宙秉持著小農職人精神 <br />
        為您嚴選在地新鮮農產品 <br />
        致力開發特色手作商品 <br />
        獻給您，來自大自然的贈禮
      </p>
      <Button
        isIconOnly
        radius="full"
        className="animate-bounce"
        onClick={scrollToSecondDiv}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 10L12 16L18 10"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
          />
        </svg>
      </Button>
    </div>
  )
}

export default MainPage
