import { FC, useCallback } from 'react'
import { TextField } from '@mui/material'

interface CustomizedTextFieldProps {
  value: string
  onChangeCallback?: (changedText: string) => any
  isAutoFocused?: boolean // Default: false;
  rows?: number // Default: 1;
  maxChars?: number // Default: Unlimited, unless specified;
  placeholder?: string // Default: null; Shows secondary text inside the text field.
  disabled?: boolean // Default: false; Disable text field.
}

const StyledTextField: FC<CustomizedTextFieldProps> = ({
  onChangeCallback,
  maxChars,
  ...props
}) => {
  const handleChangeCallback = useCallback((changedText: string) => {
    if (!onChangeCallback) return
    onChangeCallback(changedText.slice(0, maxChars))

  }, [onChangeCallback, maxChars])

  return (
    <TextField
      autoFocus={props.isAutoFocused}
      fullWidth
      multiline={props.rows ? props.rows > 1 : undefined}
      rows={props.rows || 1}
      value={props.value}
      onChange={(e) => handleChangeCallback(e.target.value)}
      placeholder={props.placeholder}
      size="small"
      disabled={props.disabled}
      autoComplete={`off`}
    />
  )
}

export default StyledTextField
