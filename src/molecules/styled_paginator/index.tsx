import { FC } from 'react'
import { Stack, Typography } from '@mui/material'
import { handleClickButton, getIsDisabled } from './index.handler'
import { buttons } from './index.data'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

type CurrentPageState = [number, (newPageNumber: number) => any]

interface Props {
  titlePlural?: string
  currentPageState: CurrentPageState
  totalCount: number
  eachPageCount: number
}

const StyledPaginator: FC<Props> = (props) => {
  const [currentPage, setCurrentPage] = props.currentPageState
  const totalPages = Math.ceil(props.totalCount / props.eachPageCount)
  const from = 1 + props.eachPageCount * (currentPage - 1)
  const to = Math.min(from + props.eachPageCount - 1, props.totalCount)

  const titlePlural = props.titlePlural || `items`

  const loopedButtons = buttons.map((button) => (
    <Tooltip title={``} placement={`bottom`} key={button.id}>
      <span>
        <IconButton
          size={`small`}
          onClick={() =>
            handleClickButton(
              button.id,
              currentPage,
              totalPages,
              setCurrentPage,
            )
          }
          disableRipple
          disabled={getIsDisabled(
            button.id,
            currentPage,
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

export default StyledPaginator
