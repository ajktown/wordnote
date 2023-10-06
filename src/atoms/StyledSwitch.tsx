import { FC } from 'react'
import { Switch, SwitchProps, Tooltip, TooltipProps } from '@mui/material'

interface Props {
  tooltipProps: Omit<TooltipProps, 'children'>
  switchProps?: SwitchProps // the word switch is reserved in typescript.
}

const StyledSwitch: FC<Props> = ({ tooltipProps, switchProps }) => {
  return (
    <Tooltip {...tooltipProps}>
      <span>
        <Switch size="small" color="default" {...switchProps} />
      </span>
    </Tooltip>
  )
}

export default StyledSwitch
