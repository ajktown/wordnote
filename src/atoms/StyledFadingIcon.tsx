import { Fade } from '@mui/material'
import { FC, Fragment, JSX } from 'react'

interface Props {
  showFirst: boolean
  firstIcon: JSX.Element
  secondIcon: JSX.Element
}

// TODO: This component is not used, and its not really good yet.
const PRIVATE_SPEED_MILLISECONDS = 1000

const StyledFadingIcon: FC<Props> = ({ showFirst, firstIcon, secondIcon }) => {
  return (
    <Fragment>
      <Fade in={showFirst} timeout={PRIVATE_SPEED_MILLISECONDS}>
        {firstIcon}
      </Fade>
      <Fade in={!showFirst} timeout={PRIVATE_SPEED_MILLISECONDS}>
        <span style={{ position: `absolute` }}>{secondIcon}</span>
      </Fade>
    </Fragment>
  )
}

export default StyledFadingIcon
