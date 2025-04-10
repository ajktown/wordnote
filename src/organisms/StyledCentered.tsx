import { Grid } from '@mui/material'
import { FC, JSX } from 'react'

// TODO: The min-height is not really good.
// TODO: Should follow the parent's size or be smarter idk.
interface Props {
  children: JSX.Element | JSX.Element[]
}
const StyledCentered: FC<Props> = ({ children }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: `100vh` }}
    >
      <Grid size={5}>{children}</Grid>
    </Grid>
  )
}

export default StyledCentered
