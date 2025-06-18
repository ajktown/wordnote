import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import StyledDialog from '@/organisms/StyledDialog'
import { isPreferenceDialogOpenedState } from '@/states/preferences/preference.state'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
} from '@mui/material'
import { FC } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import PreferenceLanguageCheckbox from '../atom_preference_language_checkbox'
import GptKeyRegisterer from '../molecule_gpt_key_registerer'

const PreferenceDialog: FC = () => {
  const isPreferenceDialogOpened = useRecoilValue(isPreferenceDialogOpenedState)
  const resetPreferenceDialogOpenedState = useResetRecoilState(
    isPreferenceDialogOpenedState,
  )

  if (!isPreferenceDialogOpened) return null

  return (
    <StyledDialog
      visuals={{ maxWidth: `sm` }}
      onClose={resetPreferenceDialogOpenedState}
    >
      <DialogTitle>{`Setting`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{`Select your native languages:`}</DialogContentText>
        <FormGroup>
          <PreferenceLanguageCheckbox languageCode="en" />
          <PreferenceLanguageCheckbox languageCode="zh" />
          <PreferenceLanguageCheckbox languageCode="ja" />
          <PreferenceLanguageCheckbox languageCode="ko" />
        </FormGroup>
        <DialogContentText>{`Register your GPT API Key:`}</DialogContentText>
        <GptKeyRegisterer />
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
