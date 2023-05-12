import { FC } from 'react'
import Appbar from '../components/organism_appbar'
import HomeLayout from '../layouts'

const HomePage: FC = () => {
  return (
    <Appbar>
      <HomeLayout />
    </Appbar>
  )
}

export default HomePage
