import { FC, useCallback, useState, Fragment } from 'react'
import { Box, Typography } from '@mui/material'
import StyledDropDown from '@/atoms/StyledDropDown'
import { PUBLIC_STATIC_AVAILABLE_LANGUAGES } from './index.dummy'
import { LanguageCode } from 'iso-639-1'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words.state'

interface BoxStyle {
  main: object
  secondary: { mb?: number; mr?: number }
  fontSize: number
}

const verticalStyle: BoxStyle = {
  main: {}, // nothing
  secondary: { mb: 0.4 },
  fontSize: 12,
}

const horizontalStyle: BoxStyle = {
  main: { display: `flex`, alignItems: `center` },
  secondary: { mr: 0.7 },
  fontSize: 14,
}

interface Props {
  wordId: string
  useVerticalStyle?: boolean
  hideTitle?: boolean
}
const LanguageSelector: FC<Props> = ({
  wordId,
  useVerticalStyle,
  hideTitle,
}) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const putWord = usePutWord(wordId)

  const [selectedId, setSelectedId] = useState<LanguageCode | undefined>(
    word?.languageCode,
  )

  const handleChange = useCallback(
    (id: string) => {
      const converted = id as LanguageCode
      setSelectedId(converted)

      putWord({ languageCode: converted })
    },
    [putWord],
  )

  const boxStyle = useVerticalStyle ? verticalStyle : horizontalStyle

  return (
    <Box {...boxStyle.main}>
      {!hideTitle && (
        <Fragment>
          <Typography color="text.secondary" fontSize={boxStyle.fontSize}>
            {` `}
            {`Language`}
          </Typography>
          <Box {...boxStyle.secondary} />
        </Fragment>
      )}
      <StyledDropDown
        items={PUBLIC_STATIC_AVAILABLE_LANGUAGES.map((lang) => ({
          id: lang.code,
          title: lang.flagUnicode + ` ` + lang.nativeName,
        }))}
        selectedId={selectedId}
        onChange={handleChange}
      />
    </Box>
  )
}

export default LanguageSelector
