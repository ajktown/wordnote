import { FC, useCallback, ChangeEvent, ReactNode, useMemo } from 'react'
import { TextField } from '@mui/material'
import { GlobalMuiTextFieldVariant } from '@/global.interface'

interface Props {
  value: string
  onChange?: (changedText: string) => any
  isAutoFocused?: boolean // Default: false;
  rows?: number // Default: 1;
  maxChars?: number // Default: Unlimited, unless specified;
  placeholder?: {
    message: string // Default: null; Shows secondary text inside the text field.
    hideLabelWithInput?: boolean // Shows the label on top when input is given.
  }
  disabled?: boolean // Default: false; Disable text field.
  buttons?: {
    left?: ReactNode
    right?: ReactNode
  }
  designs?: {
    variant?: GlobalMuiTextFieldVariant
  }
}

const StyledTextField: FC<Props> = ({
  value,
  onChange,
  maxChars,
  placeholder,
  ...props
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange && onChange(e.target.value.slice(0, maxChars))
    },
    [onChange, maxChars],
  )

  const label: string = useMemo(() => {
    if (!value) return `` // If no user input given, it should NOT show any label.
    if (!placeholder) return `` // If use does not set the message for the placeholder
    if (placeholder.hideLabelWithInput) return `` // If user sets to hide the label with input

    return placeholder.message
  }, [value, placeholder])

  return (
    <TextField
      autoFocus={props.isAutoFocused}
      fullWidth
      variant={props.designs?.variant}
      multiline={props.rows ? props.rows > 1 : undefined}
      rows={props.rows || 1}
      label={label}
      value={value}
      onChange={handleChange}
      placeholder={placeholder?.message}
      size="small"
      disabled={props.disabled}
      autoComplete={`off`}
      InputProps={{
        startAdornment: props.buttons?.left,
        endAdornment: props.buttons?.right,
      }}
    />
  )
}

export default StyledTextField
