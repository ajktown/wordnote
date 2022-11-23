import { FC } from 'react'
import { useWords } from '../hook/words/use-words.hook'
import HomeLayout from '../layouts'
import StyledMoleculeAppbar from '../molecules/StyledAppbar.m'

const Home: FC = () => {
  return (
    <StyledMoleculeAppbar
      title="Wordy"
    >
      <HomeLayout />
    </StyledMoleculeAppbar>
  )
}

export default Home
