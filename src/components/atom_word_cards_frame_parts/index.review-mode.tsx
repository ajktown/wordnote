import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useMemo } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import ReviewModeToOff from '@mui/icons-material/VisibilityOff'
import ReviewModeToOn from '@mui/icons-material/Visibility'
import { isReviewModeState } from '@/recoil/preferences/preference.state'
/**
 * When you click it, the Wordnote becomes a review mode.
 * Use-cases
 * 1. When user wants to test himself/herself.
 */
const WordCardsFrameReviewModePart: FC = () => {
  const isReviewMode = useRecoilValue(isReviewModeState)

  const onClick = useRecoilCallback(
    ({ set }) =>
      async () => {
        set(isReviewModeState, !isReviewMode)
      },
    [isReviewMode],
  )
  const hoverMessage = {
    title: isReviewMode ? `Show everything` : `Hide everything except meanings`,
  }
  const jsxElementButton = useMemo(() => {
    return isReviewMode ? (
      <ReviewModeToOn fontSize="small" />
    ) : (
      <ReviewModeToOff fontSize="small" />
    )
  }, [isReviewMode])

  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={jsxElementButton}
      hoverMessage={hoverMessage}
    />
  )
}

export default WordCardsFrameReviewModePart
