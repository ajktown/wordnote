import { FC, useCallback, ChangeEvent } from 'react'
import { TextField } from '@mui/material'

interface CustomizedTextFieldProps {
  value: string
  onChange?: (changedText: string) => any
  isAutoFocused?: boolean // Default: false;
  rows?: number // Default: 1;
  maxChars?: number // Default: Unlimited, unless specified;
  placeholder?: string // Default: null; Shows secondary text inside the text field.
  disabled?: boolean // Default: false; Disable text field.
}

const StyledTextField: FC<CustomizedTextFieldProps> = ({
  onChange,
  maxChars,
  ...props
}) => {

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!onChange) return
      onChange(e.target.value.slice(0, maxChars))
    },
    [onChange, maxChars],
  )

  return (
    <TextField
      autoFocus={props.isAutoFocused}
      fullWidth
      multiline={props.rows ? props.rows > 1 : undefined}
      rows={props.rows || 1}
      value={props.value}
      onChange={handleChange}
      placeholder={props.placeholder}
      size="small"
      disabled={props.disabled}
      autoComplete={`off`}
    />
  )
}

export default StyledTextField
