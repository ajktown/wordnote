import { FC } from 'react'
import Appbar from '../components/organism_appbar'
import HomeLayout from '../layouts'
import FirstTimeUserConfetti from '@/components/organism_first_user_confetti'

const HomePage: FC = () => {
  return (
    <Appbar>
      <FirstTimeUserConfetti />
      <HomeLayout />
    </Appbar>
  )
}

export default HomePage
