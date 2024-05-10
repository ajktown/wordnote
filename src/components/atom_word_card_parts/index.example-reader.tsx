import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useCallback } from 'react'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { ISharedWord } from '@/api/words/interfaces'

interface Props {
  word: ISharedWord
}
/**
 * Renders a sound button, and once it is clicked, it reads the example
 * with the default feature given by most of the modern browsers.
 * AJK Town only supports English only at this point
 */
const WordCardExampleReaderPart: FC<Props> = ({ word }) => {
  const exampleTrimmed = word.example.trim()
  const msg = new SpeechSynthesisUtterance(exampleTrimmed)

  const onClick = useCallback(() => {
    window.speechSynthesis.speak(msg)
  }, [msg])

  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={<VolumeUpIcon />}
      isDisabled={!exampleTrimmed || word.languageCode !== `en`}
    />
  )
}

export default WordCardExampleReaderPart
