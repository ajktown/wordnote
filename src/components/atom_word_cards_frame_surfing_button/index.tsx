import { FC } from 'react'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import SurfingIcon from '@mui/icons-material/Surfing'

const WordCardsFrameSurfingButton: FC = () => {
  const onClick = () => {
    console.log(`Hello World!`)
  }
  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={<SurfingIcon />}
    />
  )
}

export default WordCardsFrameSurfingButton
