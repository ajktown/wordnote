import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, Fragment } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import PreferenceDialog from '../dialog_preference'
import { useRecoilCallback } from 'recoil'
import { isPreferenceDialogOpenedState } from '@/recoil/preferences/preference.state'

const WordCardsFramePreferenceButtonPart: FC = () => {
  const onClick = useRecoilCallback(({ set }) => () => {
    set(isPreferenceDialogOpenedState, true)
  })

  return (
    <Fragment>
      <StyledIconButtonAtom
        jsxElementButton={<SettingsIcon fontSize="small" />}
        hoverMessage={{ title: `Preference` }}
        onClick={onClick}
      />
      <PreferenceDialog />
    </Fragment>
  )
}

export default WordCardsFramePreferenceButtonPart
