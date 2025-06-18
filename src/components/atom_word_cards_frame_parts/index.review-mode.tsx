import { FC } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { isReviewModeState } from '@/states/preferences/preference.state'
import StyledVisibilityAtom from '@/atoms/StyledVisibility'
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

  return (
    <StyledVisibilityAtom
      isVisible={isReviewMode}
      onClick={onClick}
      visibleHoverMessage={`Show everything`}
      invisibleHoverMessage={`Hide everything except meanings`}
    />
  )
}

export default WordCardsFrameReviewModePart
