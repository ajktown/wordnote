import { FC } from 'react'
import { AppBar, Box } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AppsIcon from '@mui/icons-material/Apps'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import AppbarSearchBar from '@/components/molecule_appbar_search_bar'
import Image from 'next/image'
import EndUserAvatar from '@/components/atom_user_avatar/index.end-user'
import AppbarToConsistencyPageButtonPart from '@/components/atom_appbar_parts/index.to_consistency_page_button'
import AppbarGitHubButtonPart from '@/components/atom_appbar_parts/index.github_icon'
import { useWindowSize } from 'react-use'

const PRIVATE_TITLE = `Wordnote GPT (Beta)`
const PRIVATE_SHORTER_TITLE = `WGT`
const PRIVATE_TITLE_SHRINK_PIXELS = 1200
const PRIVATE_TITLE_LOGO = `/favicon_archived/android-chrome-512x512.png`
interface Props {
  children?: JSX.Element | JSX.Element[]
}
const Appbar: FC<Props> = (props) => {
  const { width } = useWindowSize()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar variant="dense">
          <StyledIconButtonAtom jsxElementButton={<AppsIcon />} isDisabled />
          <Box width={10} />
          <Image
            src={PRIVATE_TITLE_LOGO}
            alt="logo"
            width={30}
            height={30}
            style={{ marginRight: 8 }}
          />

          {width <= PRIVATE_TITLE_SHRINK_PIXELS && (
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              fontFamily={`Cormorant Garamond`}
            >
              {PRIVATE_SHORTER_TITLE}
            </Typography>
          )}
          {PRIVATE_TITLE_SHRINK_PIXELS < width && (
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              fontFamily={`Cormorant Garamond`}
            >
              {PRIVATE_TITLE}
            </Typography>
          )}
          <Box pr={2} />
          <AppbarSearchBar />
          <Box flexGrow={1} />
          <AppbarToConsistencyPageButtonPart />
          <Box pr={0.25} />
          <AppbarGitHubButtonPart />
          <Box pr={0.25} />
          <EndUserAvatar />
        </Toolbar>
      </AppBar>
      <Box height="calc(100vh - 48px)">{props.children}</Box>
    </Box>
  )
}

export default Appbar
