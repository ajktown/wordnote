import { FC } from 'react'
import StyledAppbarMolecule from '../../molecules/StyledAppbar'
import { useIsAppBooted } from '@/hooks/\bapp/use-is-app-booted.hook'
import StyledBackdrop from '@/organisms/StyledBackdrop'

interface Props {
  children?: JSX.Element | JSX.Element[]
}
const Appbar: FC<Props> = ({ children }) => {
  const isBooted = useIsAppBooted()

  if (!isBooted) return <StyledBackdrop />

  return (
    <StyledAppbarMolecule
      title="Wordnote"
      titleLogoPath="/favicon_archived/android-chrome-512x512.png"
    >
      {children}
    </StyledAppbarMolecule>
  )
}

export default Appbar
