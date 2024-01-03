import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useCallback } from 'react'
import TopOfPageIcon from '@mui/icons-material/KeyboardArrowUp'

/**
 * Goes to the top of the page of the end user's browser.
 * Use-cases
 * 1. When the end user wants to go to the top of the page, at the end of the Wordcard list page.
 */
export const TopOfPageButton: FC = () => {
  const onClick = useCallback(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <StyledIconButtonAtom
      jsxElementButton={<TopOfPageIcon />}
      onClick={onClick}
      hoverMessage={{ title: `Top of page` }}
    />
  )
}
