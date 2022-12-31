import { FC, useCallback, useState, Fragment } from 'react'
import { Box, Typography } from '@mui/material'
import StyledDropDown from '@/atoms/StyledDropDown'
import { PUBLIC_STATIC_AVAILABLE_LANGUAGES } from './index.dummy'
import { LanguageCode } from 'iso-639-1'
import { WordDataModifiableKey } from '@/api/words/words.interface'

interface BoxStyle {
  main: object
  secondary: { mb?: number, mr?: number }
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

const PRIVATE_FINAL_MODIFIABLE_KEY: WordDataModifiableKey = `languageCode`

interface Props {
  languageCode: LanguageCode
  onClickModify: (wordKey: WordDataModifiableKey, newInput: string) => any
  useVerticalStyle?: boolean
  hideTitle?: boolean
}
const LanguageSelector: FC<Props> = ({ languageCode, onClickModify, useVerticalStyle, hideTitle }) => {
  const [selectedId, setSelectedId] = useState<LanguageCode>(languageCode)
  const handleChange = useCallback(
    (id: string) => {
      const converted = id as LanguageCode
      setSelectedId(converted)
      onClickModify(PRIVATE_FINAL_MODIFIABLE_KEY, converted)
    },
    [onClickModify],
  )

  const boxStyle = useVerticalStyle ? verticalStyle : horizontalStyle
  

  return (
    <Box { ...boxStyle.main }>
      {!hideTitle && (
        <Fragment>
          <Typography color="text.secondary" fontSize={boxStyle.fontSize}>
            {` `}
            {`Language`}
          </Typography>
          <Box { ...boxStyle.secondary }/>
        </Fragment>
      )}
      <StyledDropDown
        items={PUBLIC_STATIC_AVAILABLE_LANGUAGES.map((lang) => ({
          id: lang.code,
          title: lang.nativeName + lang.flagUnicode,
        }))}
        selectedId={selectedId}
        onChange={handleChange}
      />
    </Box>
  )
}

export default LanguageSelector
