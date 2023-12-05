import { FC, Fragment } from 'react'
import WordCardFrame from '@/components/organism_word_card_frame'
import ErrorApiConnectionFail from '@/components/molecule_error_api_connection_fail'
import FirstTimeUserWelcomeMessage from '@/components/molecule_first_time_user_welcome_message'

const HomeLayout: FC = () => {
  return (
    <Fragment>
      <ErrorApiConnectionFail />
      <FirstTimeUserWelcomeMessage />
      <WordCardFrame />
    </Fragment>
  )
}

export default HomeLayout
