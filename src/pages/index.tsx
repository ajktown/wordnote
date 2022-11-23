import { FC } from 'react'
import { useWords } from '../hook/words/use-words.hook'
import HomeLayout from '../layouts'
import StyledAppbarMolecule from '../molecules/StyledAppbar.m'

const Home: FC = () => {
  return (
    <StyledAppbarMolecule
      title="Wordy"
    >
      <HomeLayout />
    </StyledAppbarMolecule>
  )
}

export default Home
