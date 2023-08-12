import { useCallback, ChangeEvent, ReactNode, forwardRef } from 'react'
import { TextField } from '@mui/material'
import { GlobalMuiTextFieldVariant } from '@/global.interface'

interface Props {
  value?: unknown
  onChange?: (changedText: string) => any
  isAutoFocused?: boolean // Default: false;
  rows?: number // Default: 1;
  maxChars?: number // Default: Unlimited, unless specified;
  label?: string
  usePlaceholder?: boolean // Use the given label for the placeholder
  disabled?: boolean // Default: false; Disable text field.
  buttons?: {
    left?: ReactNode
    right?: ReactNode
  }
  designs?: {
    variant?: GlobalMuiTextFieldVariant
  }
}

const StyledTextField = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, maxChars, label, usePlaceholder, ...props }, ref) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (onChange) onChange(e.target.value.slice(0, maxChars))
      },
      [onChange, maxChars],
    )

    return (
      <TextField
        inputRef={ref}
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
          startAdornment: props.buttons?.left,
          endAdornment: props.buttons?.right,
        }}
      />
    )
  },
)

// This is used to display the name of the component in the dev tools.
StyledTextField.displayName = `StyledTextField`
export default StyledTextField
