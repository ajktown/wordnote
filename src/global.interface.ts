export type GlobalMuiColor =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | undefined

export type GlobalMuiVariant = 'text' | 'outlined' | 'contained' | undefined

export type GlobalMuiPlacement =
  | 'right'
  | 'left-start'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-end'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'top-end'
  | 'top-start'
  | 'top'
  | undefined

// TODO: If you find this from 3rd party source, deprecate it, use the source, and remove this type "KeyboardEventKey"
// Only key events that are used for this application, will be added
// To see the full list check here: https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
export type GlobalKeyboardEventKey =
  | 'Escape' // ESC Key
  | 'ArrowRight'
  | 'ArrowLeft'
  | 'ArrowUp'
  | 'ArrowDown'

export type GlobalMuiSize = 'small' | 'medium' | 'large'

export type GlobalMuiFontSize = 'inherit' | 'large' | 'medium' | 'small'
