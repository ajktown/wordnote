import { FC, useCallback } from 'react'
import {FormControl, Select, MenuItem, SelectChangeEvent} from '@mui/material'
import StyledDropDownStyle from './StyledDropDown.style'

interface Item {
  id: string
  title: string | number
  disabled?: boolean
}
interface Props {
  items: Item[]
  selectedId: string
  onChange: (id: string) => any
  disabled?: boolean
}
const StyledDropDown: FC<Props> = ({ onChange, ...props }) => {
  const handleChange = useCallback((e: SelectChangeEvent<string>) => {
    onChange(e.target.value)
  }, [onChange])

  return (
    <FormControl variant="standard">
      <Select
        value={props.selectedId || ``}
        disabled={props.disabled}
        onChange={handleChange}
        input={<StyledDropDownStyle />}
      >
        {props.items.map((item) => (
          <MenuItem key={item.id} value={item.id} disabled={item.disabled}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default StyledDropDown