import { FC } from 'react'
import HomeLayout from '../layouts'
import StyledAppbarMolecule from '../molecules/StyledAppbar.m'

const Home: FC = () => {
  return (
    <StyledAppbarMolecule
      title="Wordnote"
      titleLogoPath="/favicon_archived/android-chrome-512x512.png"
    >
      <HomeLayout />
    </StyledAppbarMolecule>
  )
}

export default Home
