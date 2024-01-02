import { FC, useMemo } from 'react'
import StyledIconButtonAtom from './StyledIconButton'
import VisibilityToOff from '@mui/icons-material/VisibilityOff'
import VisibilityToOn from '@mui/icons-material/Visibility'

interface Props {
  isVisible: boolean
  visibleHoverMessage?: string // message when visible
  invisibleHoverMessage?: string // message when not visible
  onClick: () => any
}

/**
 * StyledVisibilityAtom is a simple button to shows either visible or not visible based on given props.
 */
const StyledVisibilityAtom: FC<Props> = ({
  isVisible,
  visibleHoverMessage,
  invisibleHoverMessage,
  onClick,
}) => {
  const jsxElementButton = useMemo(
    () =>
      isVisible ? (
        <VisibilityToOn fontSize="small" />
      ) : (
        <VisibilityToOff fontSize="small" />
      ),
    [isVisible],
  )

  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={jsxElementButton}
      hoverMessage={{
        title: isVisible
          ? visibleHoverMessage ?? ``
          : invisibleHoverMessage ?? ``,
      }}
    />
  )
}

export default StyledVisibilityAtom
