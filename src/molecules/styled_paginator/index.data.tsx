import FirstPageIcon from '@mui/icons-material/FirstPage'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import LastPageIcon from '@mui/icons-material/LastPage'

export type ButtonType = 'FirstPage' | 'BeforePage' | 'NextPage' | 'LastPage'

interface ButtonData {
  id: ButtonType
  title: string
  icon: JSX.Element
}

export const buttons: ButtonData[] = [
  {
    id: `FirstPage`,
    title: `First Page`,
    icon: <FirstPageIcon />,
  },
  {
    id: `BeforePage`,
    title: `Before Page`,
    icon: <NavigateBeforeIcon />,
  },
  {
    id: `NextPage`,
    title: `Next Page`,
    icon: <NavigateNextIcon />,
  },
  {
    id: `LastPage`,
    title: `Last Page`,
    icon: <LastPageIcon />,
  },
]
