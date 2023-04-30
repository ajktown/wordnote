import { FC } from 'react'
import Appbar from '../components/organism_appbar'
import HomeLayout from '../layouts'
import { useIsAppBooted } from '@/hooks/\bapp/use-is-app-booted.hook'
import StyledBackdrop from '@/organisms/StyledBackdrop'
const HomePage: FC = () => {
  if (!useIsAppBooted()) return <StyledBackdrop />

  return (
    <Appbar>
      <HomeLayout />
    </Appbar>
  )
}

export default HomePage
