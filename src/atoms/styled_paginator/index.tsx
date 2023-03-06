import { FC } from 'react'
import { Stack, Typography } from '@mui/material'
import * as lambda from './index.lambda'
import { buttons } from './index.data'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

type Props = {
  titlePlural?: string
  currentPage: number
  setCurrentPage: (newPageNumber: number) => any
  totalCount: number
  eachPageCount: number
}
const Paginator: FC<Props> = (props) => {
  const totalPages = Math.ceil(props.totalCount / props.eachPageCount)
  const from = 1 + props.eachPageCount * (props.currentPage - 1)
  const to = Math.min(from + props.eachPageCount - 1, props.totalCount)

  const titlePlural = props.titlePlural || `items`

  const loopedButtons = buttons.map((button) => (
    <Tooltip title={``} placement={`bottom`} key={button.id}>
      <span>
        <IconButton
          size={`small`}
          onClick={() =>
            lambda.handleClickButton(
              button.id,
              props.currentPage,
              totalPages,
              props.setCurrentPage,
            )
          }
          disableRipple
          disabled={lambda.getIfDisabled(
            button.id,
            props.currentPage,
            totalPages,
          )}
        >
          {button.icon}
        </IconButton>
      </span>
    </Tooltip>
  ))

  return (
    <Stack sx={{ alignItems: `center` }} direction={`row`} flexGrow={1}>
      {loopedButtons.slice(0, 2)}
      {props.totalCount === 0 ? (
        <Typography variant="body2">{`No ${titlePlural}`}</Typography>
      ) : (
        <Typography variant="body2">
          {from === to && `${from} of ${props.totalCount} ${titlePlural}`}
          {from !== to &&
            `${from} to ${to} of ${props.totalCount} ${titlePlural}`}
        </Typography>
      )}
      {loopedButtons.slice(2)}
    </Stack>
  )
}

export default Paginator
