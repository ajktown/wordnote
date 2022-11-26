import { FC } from 'react'
import { Tooltip, Box } from '@mui/material'
import {
  GlobalMuiColor,
  GlobalMuiPlacement,
  GlobalMuiVariant,
} from '../global.interface'
import { LoadingButton } from '@mui/lab'

interface Props {
  title: string
  isLoading?: boolean
  handleClick?: any
  isDisabled?: boolean
  color?: GlobalMuiColor
  variant?: GlobalMuiVariant
  hoverMessage?: {
    title: string
    placement?: GlobalMuiPlacement
  }
  IconRight?: JSX.Element // Try to give a space within the jsx element for better usage
}

const StyledTextButtonAtom: FC<Props> = (props) => {
  const handleClickButton = () => {
    if (!props.handleClick) return
    props.handleClick()
  }

  return (
    <Box>
      <Tooltip
        title={props.hoverMessage?.title || ``}
        placement={props.hoverMessage?.placement || `bottom`}
        hidden={props.isLoading || props.isDisabled}
      >
        <span style={{ cursor: !props.hoverMessage ? undefined : `help` }}>
          <LoadingButton
            variant={props.variant || `outlined`}
            size="small"
            disabled={props.isDisabled}
            loading={props.isLoading}
            color={props.color || `inherit`}
            onClick={handleClickButton}
            sx={{ textTransform: `none` }}
          >
            {props.title}
          </LoadingButton>
        </span>
      </Tooltip>
    </Box>
  )
}

export default StyledTextButtonAtom
