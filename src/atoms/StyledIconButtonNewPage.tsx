import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import LaunchIcon from '@mui/icons-material/Launch'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'
interface Props {
  link: string
  hoverMessage?: string
  disabled?: boolean
}
const StyledIconButtonNewPage: FC<Props> = ({
  link,
  hoverMessage,
  disabled,
}) => {
  const onClick = useOpenNewTab(link)

  return (
    <StyledIconButtonAtom
      isDisabled={disabled}
      onClick={onClick}
      jsxElementButton={<LaunchIcon />}
      hoverMessage={{ title: hoverMessage ?? `` }}
    />
  )
}

export default StyledIconButtonNewPage
