import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import StyledTextField from '@/atoms/StyledTextField'
import { gptApiKeySelector } from '@/recoil/preferences/preferenece.selector'
import { Alert, Typography } from '@mui/material'
import { FC, Fragment, useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

const GptKeyRegisterer: FC = () => {
  const gptApiKey = useRecoilValue(gptApiKeySelector)
  const [input, setInput] = useState<string>(gptApiKey)

  const onClickApply = useCallback(() => {}, [])
  const onClickCancel = useCallback(() => setInput(gptApiKey), [gptApiKey])

  return (
    <Alert severity="info">
      <StyledTextField
        value={input}
        onChange={setInput}
        buttons={{
          right: input != gptApiKey && (
            <Fragment>
              <StyledIconButtonAtom
                jsxElementButton={<CheckIcon fontSize="small" />}
                onClick={onClickApply}
              />
              <StyledIconButtonAtom
                jsxElementButton={<ClearIcon fontSize="small" />}
                onClick={onClickCancel}
              />
            </Fragment>
          ),
        }}
      />
      <Typography variant="caption">{gptApiKey}</Typography>
    </Alert>
  )
}

export default GptKeyRegisterer
