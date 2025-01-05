import { FC } from 'react'
import { useRecoilCallback } from 'recoil'
import { isFixedTagsDialogOpenState } from '@/recoil/words/words.state'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
/**
 * WordCardsFrameFixedTagsButton shows the button to open the dialog for fixed tags.
 */
const WordCardsFrameFixedTagsButton: FC = () => {
  const onClick = useRecoilCallback(
    ({ set }) =>
      async () => {
        set(isFixedTagsDialogOpenState, true)
      },
    [],
  )

  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={<LocalOfferIcon fontSize="small" />}
      hoverMessage={{
        title: `Fixed Tags`,
      }}
    />
  )
}

export default WordCardsFrameFixedTagsButton
