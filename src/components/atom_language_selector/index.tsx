import { FC, useCallback, useState } from 'react'
import { Box, Typography } from '@mui/material'
import StyledDropDown from '@/atoms/StyledDropDown'
import { PUBLIC_STATIC_AVAILABLE_LANGUAGES } from './index.dummy'
import { LanguageCode } from 'iso-639-1'
import { WordDataModifiableKey } from '@/api/words/words.interface'

const PRIVATE_FINAL_MODIFIABLE_KEY: WordDataModifiableKey = `languageCode`

interface Props {
  languageCode: LanguageCode
  onClickModify: (wordKey: WordDataModifiableKey, newInput: string) => any
}
const LanguageSelector: FC<Props> = ({ languageCode, onClickModify }) => {
  const [selectedId, setSelectedId] = useState<LanguageCode>(languageCode)
  const handleChange = useCallback(
    (id: string) => {
      const converted = id as LanguageCode
      setSelectedId(converted)
      onClickModify(PRIVATE_FINAL_MODIFIABLE_KEY, converted)
    },
    [onClickModify],
  )

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography color="text.secondary" fontSize={14} > {`Language`}</Typography>
      <Box mr={0.7} />
      <StyledDropDown
        items={PUBLIC_STATIC_AVAILABLE_LANGUAGES.map((lang) => ({
          id: lang.code,
          title: lang.nativeName,
        }))}
        selectedId={selectedId}
        onChange={handleChange}
      />
    </Box>
  )
}

export default LanguageSelector
