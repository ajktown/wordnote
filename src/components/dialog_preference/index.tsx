import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { GlobalLanguageCode } from '@/global.interface'
import StyledDialog from '@/organisms/StyledDialog'
import {
  PreferenceState,
  isPreferenceDialogOpenedState,
} from '@/recoil/preferences/preference.state'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material'
import { FC, SyntheticEvent } from 'react'
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil'

const privateSupportedLanguages: { [key: string]: GlobalLanguageCode } = {
  English: `en`,
  Chinese: `zh`,
  Japanese: `ja`,
  Korean: `ko`,
}

const PreferenceDialog: FC = () => {
  const isPreferenceDialogOpened = useRecoilValue(isPreferenceDialogOpenedState)
  const preference = useRecoilValue(PreferenceState)
  const resetPreferenceDialogOpenedState = useResetRecoilState(
    isPreferenceDialogOpenedState,
  )

  const onChange = useRecoilCallback(
    ({ set, snapshot }) =>
      async (e: SyntheticEvent<Element, Event>, checked: boolean) => {
        const preference = await snapshot.getPromise(PreferenceState)
        if (!preference) return

        const element = e.target as HTMLInputElement
        const languageCode = element.value as GlobalLanguageCode
        const nativeLanguagesSet = new Set([
          ...preference.nativeLanguages,
          languageCode,
        ])

        if (!checked) nativeLanguagesSet.delete(languageCode)
        const nativeLanguages: GlobalLanguageCode[] =
          Array.from(nativeLanguagesSet)

        set(PreferenceState, {
          ...preference,
          nativeLanguages,
        })
      },
  )

  if (!isPreferenceDialogOpened) return null

  return (
    <StyledDialog
      visuals={{ maxWidth: `xs` }}
      onClose={resetPreferenceDialogOpenedState}
    >
      <DialogTitle>{`Select your native languages`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Any changes will be automatically saved to the cloud`}
        </DialogContentText>
        <FormGroup>
          <FormControlLabel
            checked={preference?.nativeLanguages.includes(`en`)}
            control={<Checkbox />}
            onChange={onChange}
            value={privateSupportedLanguages.English}
            label="English"
          />
          <FormControlLabel
            checked={preference?.nativeLanguages.includes(`zh`)}
            control={<Checkbox />}
            onChange={onChange}
            value={privateSupportedLanguages.Chinese}
            label="Chinese"
          />
          <FormControlLabel
            checked={preference?.nativeLanguages.includes(`ja`)}
            control={<Checkbox />}
            onChange={onChange}
            value={privateSupportedLanguages.Japanese}
            label="Japanese"
          />
          <FormControlLabel
            checked={preference?.nativeLanguages.includes(`ko`)}
            control={<Checkbox />}
            onChange={onChange}
            value={privateSupportedLanguages.Korean}
            label="Korean"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <StyledTextButtonAtom
          variant="text"
          title="Close"
          onClick={resetPreferenceDialogOpenedState}
        />
      </DialogActions>
    </StyledDialog>
  )
}

export default PreferenceDialog
