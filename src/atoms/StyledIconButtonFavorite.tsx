import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import FavoriteWordIcon from '@mui/icons-material/FavoriteTwoTone'
import { GlobalMuiSize } from '@/global.interface'

interface Props {
  isClicked: boolean
  onClick?: () => any
  size?: GlobalMuiSize
}
const StyledIconButtonFavorite: FC<Props> = ({ isClicked, onClick, size }) => {
  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={
        <FavoriteWordIcon
          style={{
            color: isClicked ? `FF0000` /* Red */ : undefined,
            fontSize: size,
          }}
        />
      }
    />
  )
}

export default StyledIconButtonFavorite
