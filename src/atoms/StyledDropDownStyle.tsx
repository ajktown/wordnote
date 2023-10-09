import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

const PRIVATE_FINAL_BOX_HEIGHT_PX = 7

export default styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: `relative`,
    border: `1px solid #7d7d7d`,
    fontSize: 12,
    padding: `${PRIVATE_FINAL_BOX_HEIGHT_PX}px 26px ${PRIVATE_FINAL_BOX_HEIGHT_PX}px 12px`,
    transition: theme.transitions.create([`border-color`, `box-shadow`]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      `-apple-system`,
      `BlinkMacSystemFont`,
      `"Segoe UI"`,
      `Roboto`,
      `"Helvetica Neue"`,
      `Arial`,
      `sans-serif`,
      `"Apple Color Emoji"`,
      `"Segoe UI Emoji"`,
      `"Segoe UI Symbol"`,
    ].join(`,`),
    '&:focus': {
      borderRadius: 4,
      // borderColor: themes.appTheme,
      boxShadow: `0 0 0 0.2rem rgba(0,123,255,.25)`,
    },
  },
}))
