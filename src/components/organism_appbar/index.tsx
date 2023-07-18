import { FC } from 'react'
import StyledAppbarMolecule from '../../molecules/StyledAppbar'

interface Props {
  children?: JSX.Element | JSX.Element[]
}
const Appbar: FC<Props> = ({ children }) => {
  return (
    <StyledAppbarMolecule
      title="Wordnote (Beta)"
      titleLogoPath="/favicon_archived/android-chrome-512x512.png"
    >
      {children}
    </StyledAppbarMolecule>
  )
}

export default Appbar
