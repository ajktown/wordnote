import { FC } from 'react'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'
import GitHubIcon from '@mui/icons-material/GitHub'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'

const link = `https://github.com/ajktown/wordnote`

const AppbarGitHubButtonPart: FC = () => {
  const onOpenNewTab = useOpenNewTab(link)

  return (
    <StyledIconButtonAtom
      onClick={onOpenNewTab}
      jsxElementButton={<GitHubIcon fontSize="small" />}
    />
  )
}

export default AppbarGitHubButtonPart
