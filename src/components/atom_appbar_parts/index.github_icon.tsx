import { FC } from 'react'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'
import GitHubIcon from '@mui/icons-material/GitHub'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'

const AppbarGitHubButtonPart: FC = () => {
  const link = `https://github.com/ajktown/wordnote`
  const onOpenNewTab = useOpenNewTab(link)

  return (
    <StyledIconButtonAtom
      url={link}
      onClick={onOpenNewTab}
      jsxElementButton={<GitHubIcon fontSize="small" />}
    />
  )
}

export default AppbarGitHubButtonPart
