import { Button, Link } from '@nextui-org/react'

const TrackLink = () => {
  return (
    <Button
      as={Link}
      href="https://query2.e-can.com.tw/ECAN_APP/search.shtm"
      showAnchorIcon
      isBlock
      variant="ghost"
      color="warning"
      target="_blank"
    >
      宅配通貨運追蹤
    </Button>
  )
}

export default TrackLink
