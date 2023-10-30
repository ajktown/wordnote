import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import StyledDialog from '@/organisms/StyledDialog'
import { isPreferenceDialogOpenedState } from '@/recoil/preferences/preference.state'
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

const PreferenceDialog: FC = () => {
  const isPreferenceDialogOpened = useRecoilValue(isPreferenceDialogOpenedState)
  const resetPreferenceDialogOpenedState = useResetRecoilState(
    isPreferenceDialogOpenedState,
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
          <PreferenceLanguageCheckbox languageCode="en" />
          <PreferenceLanguageCheckbox languageCode="zh" />
          <PreferenceLanguageCheckbox languageCode="ja" />
          <PreferenceLanguageCheckbox languageCode="ko" />
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
