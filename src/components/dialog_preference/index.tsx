import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import StyledDialog from '@/organisms/StyledDialog'
import {
  isPreferenceDialogOpenedState,
  preferenceState,
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
import { FC } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

const PreferenceDialog: FC = () => {
  const isPreferenceDialogOpened = useRecoilValue(isPreferenceDialogOpenedState)
  const Preferences = useRecoilValue(preferenceState)
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
          <FormControlLabel
            checked={Preferences?.nativeLanguages.includes(`en`)}
            control={<Checkbox />}
            label="English"
          />
          <FormControlLabel
            checked={Preferences?.nativeLanguages.includes(`zh`)}
            control={<Checkbox />}
            label="Chinese"
          />
          <FormControlLabel
            checked={Preferences?.nativeLanguages.includes(`ja`)}
            control={<Checkbox />}
            label="Japanese"
          />
          <FormControlLabel
            checked={Preferences?.nativeLanguages.includes(`ko`)}
            control={<Checkbox />}
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
