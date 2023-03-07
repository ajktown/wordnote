import { FC, Fragment } from 'react'
import WordCardFrame from '@/components/organism_word_card_frame'
import ErrorApiConnectionFail from '@/components/molecule_error_api_connection_fail'

const HomeLayout: FC = () => {
  return (
    <Fragment>
      <ErrorApiConnectionFail />
      <WordCardFrame />
    </Fragment>
  )
}

export default HomeLayout
