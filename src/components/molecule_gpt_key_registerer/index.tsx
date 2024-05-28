import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import StyledTextField from '@/atoms/StyledTextField'
import { gptApiKeySelector } from '@/recoil/preferences/preferenece.selector'
import { FC, Fragment, useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { usePatchPreference } from '@/hooks/preference/use-patch-preference.hook'

const GptKeyRegisterer: FC = () => {
  const gptApiKey = useRecoilValue(gptApiKeySelector)
  const [input, setInput] = useState<string>(gptApiKey)
  const onPutPreference = usePatchPreference()
  const [loading, setLoading] = useState(false)

  const onClickApply = useCallback(async () => {
    try {
      setLoading(true)
      await onPutPreference({ gptApiKey: input })
    } finally {
      setLoading(false)
    }
  }, [input, onPutPreference])
  const onClickCancel = useCallback(() => setInput(gptApiKey), [gptApiKey])

  return (
    <StyledTextField
      value={input}
      onChange={setInput}
      disabled={loading}
      buttons={{
        right: input != gptApiKey && (
          <Fragment>
            <StyledIconButtonAtom
              jsxElementButton={<CheckIcon fontSize="small" />}
              onClick={onClickApply}
              isDisabled={loading}
            />
            <StyledIconButtonAtom
              jsxElementButton={<ClearIcon fontSize="small" />}
              onClick={onClickCancel}
              isDisabled={loading}
            />
          </Fragment>
        ),
      }}
    />
  )
}

export default GptKeyRegisterer
