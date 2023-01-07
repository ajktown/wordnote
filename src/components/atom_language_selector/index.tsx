import { FC, useCallback, useState, Fragment, useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import StyledDropDown from '@/atoms/StyledDropDown'
import { PUBLIC_STATIC_AVAILABLE_LANGUAGES } from './index.dummy'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words.state'
import { GlobalLanguageCode } from '@/global.interface'

interface OrientationStyle {
  mainBox: object
  secondaryBox: { mb?: number; mr?: number }
  fontSize: number
}

const verticalStyle: OrientationStyle = {
  mainBox: {}, // nothing
  secondaryBox: { mb: 0.4 },
  fontSize: 12,
}

const horizontalStyle: OrientationStyle = {
  mainBox: { display: `flex`, alignItems: `center` },
  secondaryBox: { mr: 0.7 },
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

  const [selectedId, setSelectedId] = useState(word?.languageCode)

  const handleChange = useCallback(
    (id: string) => {
      const convertedLnCode = id as GlobalLanguageCode
      setSelectedId(convertedLnCode)
      putWord({ languageCode: convertedLnCode })
    },
    [putWord],
  )

  const orientationStyle = useVerticalStyle ? verticalStyle : horizontalStyle
  const items = useMemo(
    () =>
      PUBLIC_STATIC_AVAILABLE_LANGUAGES.map((lang) => ({
        id: lang.code,
        title: lang.flagUnicode + ` ` + lang.nativeName,
      })),
    [],
  )

  return (
    <Box {...orientationStyle.mainBox}>
      {!hideTitle && (
        <Fragment>
          <Typography
            color="text.secondary"
            fontSize={orientationStyle.fontSize}
          >
            {` `}
            {`Language`}
          </Typography>
          <Box {...orientationStyle.secondaryBox} />
        </Fragment>
      )}
      <StyledDropDown
        items={items}
        selectedId={selectedId}
        onChange={handleChange}
      />
    </Box>
  )
}

export default LanguageSelector
