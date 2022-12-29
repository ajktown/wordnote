import { FC, useCallback, ChangeEvent, ReactNode } from 'react'
import { TextField } from '@mui/material'
import { GlobalMuiTextFieldVariant } from '@/global.interface'
import { Box } from '@mui/system'

type ButtonSize = "small" | "medium"
const PRIVATE_DEFAULT_BUTTON_SIZE: ButtonSize = "small"
interface Props {
  value: string
  onChange?: (changedText: string) => any
  isAutoFocused?: boolean // Default: false;
  rows?: number // Default: 1;
  maxChars?: number // Default: Unlimited, unless specified;
  label?: string
  usePlaceholder?: boolean // Use the given label for the placeholder
  disabled?: boolean // Default: false; Disable text field.
  buttons?: {
    fontSize?: ButtonSize // Put the fontsize that you use for the buttons. Default: PRIVATE_DEFAULT_BUTTON_SIZE
    left?: ReactNode
    right?: ReactNode
  }
  designs?: {
    variant?: GlobalMuiTextFieldVariant
  }
}

const MyBox: FC<{ size?: ButtonSize }> = ({ size = PRIVATE_DEFAULT_BUTTON_SIZE }) => {
  // This component is prevent for dialogs to expand when rendering buttons.
  const pt = size === "medium" ? 4.3 : 3.8 // These numbers are tested and are golden numbers.
  return <Box pt={pt} />
}

const StyledTextField: FC<Props> = ({
  value,
  onChange,
  maxChars,
  label,
  usePlaceholder,
  ...props
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange && onChange(e.target.value.slice(0, maxChars))
    },
    [onChange, maxChars],
  )

  return (
    <TextField
      autoFocus={props.isAutoFocused}
      fullWidth
      variant={props.designs?.variant}
      multiline={props.rows ? props.rows > 1 : undefined}
      rows={props.rows || 1}
      label={!usePlaceholder && label}
      value={value}
      onChange={handleChange}
      placeholder={usePlaceholder ? label : undefined}
      size="small"
      disabled={props.disabled}
      autoComplete={`off`}
      InputProps={{
        startAdornment: props.buttons?.left || <MyBox size={props.buttons?.fontSize} />,
        endAdornment: props.buttons?.right || <MyBox size={props.buttons?.fontSize} />,
      }}
    />
  )
}

export default StyledTextField
