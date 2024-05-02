import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import StyledTextField from '@/atoms/StyledTextField'
import { gptApiKeySelector } from '@/recoil/preferences/preferenece.selector'
import { Alert, Typography } from '@mui/material'
import { FC, Fragment, useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { usePutPreference } from '@/hooks/preference/use-put-preference.hook'

const GptKeyRegisterer: FC = () => {
  const gptApiKey = useRecoilValue(gptApiKeySelector)
  const [input, setInput] = useState<string>(gptApiKey)
  const onPutPreference = usePutPreference()

  const onClickApply = useCallback(async () => {
    try {
      await onPutPreference({ gptApiKey: input })
    } catch {}
  }, [input, onPutPreference])
  const onClickCancel = useCallback(() => setInput(gptApiKey), [gptApiKey])

  return (
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
  )
}

export default GptKeyRegisterer
