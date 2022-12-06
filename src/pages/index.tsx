import { FC } from 'react'
import Appbar from '../components/organism_appbar'
import HomeLayout from '../layouts'

const Home: FC = () => {
  return (
    <Appbar>
      <HomeLayout />
    </Appbar>
  )
}

export default Home
