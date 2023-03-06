import { FC, useCallback, useMemo } from 'react'
import { Stack, Typography } from '@mui/material'
import ToFirstPageIcon from '@mui/icons-material/FirstPage'
import ToBeforePageIcon from '@mui/icons-material/NavigateBefore'
import ToNextPageIcon from '@mui/icons-material/NavigateNext'
import ToLastPageIcon from '@mui/icons-material/LastPage'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'

type CurrentPageState = [number, (newPageNumber: number) => any]
enum ButtonType {
  ToFirstPage = `ToFirstPage`,
  ToBeforePage = `ToBeforePage`,
  ToNextPage = `ToNextPage`,
  ToLastPage = `ToLastPage`,
}
const FIRST_PAGE_NUMBER = 1
const DEFAULT_TITLE_PLURAL = `items`

interface Props {
  titlePlural?: string
  currentPageState: CurrentPageState
  totalCount: number
  eachPageCount: number
}
interface BodyProps extends Props {
  type: ButtonType
}

const StyledPaginatorButtonIcon: FC<{ type: ButtonType }> = ({ type }) => {
  switch (type) {
    case ButtonType.ToFirstPage:
      return <ToFirstPageIcon />
    case ButtonType.ToBeforePage:
      return <ToBeforePageIcon />
    case ButtonType.ToNextPage:
      return <ToNextPageIcon />
    default: // last page
      return <ToLastPageIcon />
  }
}

const StyledPaginatorButton: FC<BodyProps> = ({
  type,
  currentPageState,
  totalCount,
  eachPageCount,
}) => {
  const [currentPage, setCurrentPage] = currentPageState
  const totalPages = useMemo(
    () => Math.ceil(totalCount / eachPageCount),
    [totalCount, eachPageCount],
  )

  const onClickButton = useCallback(() => {
    switch (type) {
      case ButtonType.ToFirstPage:
        return setCurrentPage(1)
      case ButtonType.ToBeforePage:
        return setCurrentPage(Math.max(FIRST_PAGE_NUMBER, currentPage - 1))
      case ButtonType.ToNextPage:
        return setCurrentPage(Math.min(totalPages, currentPage + 1))
      default: // last page
        return setCurrentPage(totalPages)
    }
  }, [type, totalPages, currentPage, setCurrentPage])

  const isDisabled: boolean = useMemo(() => {
    if (totalPages < 2) return true
    switch (type) {
      case ButtonType.ToFirstPage:
      case ButtonType.ToBeforePage:
        return currentPage === FIRST_PAGE_NUMBER
      case ButtonType.ToNextPage:
      case ButtonType.ToLastPage:
        return currentPage === totalPages
      default:
        return false
    }
  }, [type, totalPages, currentPage])

  return (
    <StyledIconButtonAtom
      onClick={onClickButton}
      jsxElementButton={<StyledPaginatorButtonIcon type={type} />}
      isDisabled={isDisabled}
    />
  )
}

const StyledPaginatorTextDisplay: FC<Props> = ({
  eachPageCount,
  currentPageState,
  totalCount,
  titlePlural = DEFAULT_TITLE_PLURAL,
}) => {
  const [currentPage] = currentPageState
  const from = 1 + eachPageCount * (currentPage - 1)
  const to = Math.min(from + eachPageCount - 1, totalCount)

  if (totalCount === 0)
    return <Typography variant="body2">{`No ${titlePlural}`}</Typography>

  return (
    <Typography variant="body2">
      {from === to && `${from} of ${totalCount} ${titlePlural}`}
      {from !== to && `${from} to ${to} of ${totalCount} ${titlePlural}`}
    </Typography>
  )
}

const StyledPaginatorMolecule: FC<Props> = (props) => {
  return (
    <Stack sx={{ alignItems: `center` }} direction={`row`} flexGrow={1}>
      <StyledPaginatorButton type={ButtonType.ToFirstPage} {...props} />
      <StyledPaginatorButton type={ButtonType.ToBeforePage} {...props} />
      <StyledPaginatorTextDisplay {...props} />
      <StyledPaginatorButton type={ButtonType.ToNextPage} {...props} />
      <StyledPaginatorButton type={ButtonType.ToLastPage} {...props} />
    </Stack>
  )
}

export default StyledPaginatorMolecule
