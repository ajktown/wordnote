import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  title: string
  titleLogoPath?: string // i.e) src="logo.png"
  children?: JSX.Element | JSX.Element[]
}
const StyledAppbarMolecule: FC<Props> = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          {props.titleLogoPath && (
            <img src={props.titleLogoPath} alt="logo" width={30} style={{ marginRight: 8 }} />
          )}
          <Typography variant="h6" color="inherit" component="div" fontFamily={"Cormorant Garamond"}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box height="calc(100vh - 48px)">
        {props.children}
      </Box>
    </Box>
  );
}

export default StyledAppbarMolecule
