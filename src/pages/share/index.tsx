import { PageQueryConst } from '@/constants/page-queries.constant'
import StyledCentered from '@/organisms/StyledCentered'
import { useRouter } from 'next/router'
import { FC } from 'react'

const SharePage: FC = () => {
  const router = useRouter()
  const myQuery = router.query[PageQueryConst.wordID]

  return (
    <StyledCentered>
      <h3>{`word_id query: ${myQuery}`}</h3>
    </StyledCentered>
  )
}

export default SharePage
