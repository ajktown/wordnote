import { FC } from 'react'
import { TextField } from '@mui/material'

interface CustomizedTextFieldProps {
  value: string
  handleChange?: (changedText: string) => any
  isAutoFocused?: boolean // Default: false;
  rows?: number // Default: 1;
  maxChars?: number // Default: Unlimited, unless specified;
  placeholder?: string // Default: null; Shows secondary text inside the text field.
  disabled?: boolean // Default: false; Disable text field.
}

const StyledTextField: FC<CustomizedTextFieldProps> = (props) => {
  const handleChange = (changedText: string) => {
    if (!props.handleChange) return
    if (props.maxChars) {
      return props.handleChange(changedText.slice(0, props.maxChars))
    }
    props.handleChange(changedText)
  }

  return (
    <TextField
      autoFocus={props.isAutoFocused}
      fullWidth
      multiline={props.rows ? props.rows > 1 : undefined}
      rows={props.rows || 1}
      value={props.value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={props.placeholder}
      size="small"
      disabled={props.disabled}
      autoComplete={`off`}
    />
  )
}

export default StyledTextField
