import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import Image from 'next/image'

const PRIVATE_DEFAULT_WIDTH_HEIGHT = 20
/** StyledImageButton depends on StyledIconButtonAtom */
interface Props {
  url: string // i.e) "https://www.dictionary.com"
  imageSrc: string // i.e) "/dictionary_icons/dictionary-dot-com.png"
  onClick?: () => any // Behavior when clicked
}
const StyledImageButtonAtom: FC<Props> = ({ url, imageSrc, onClick }) => {
  return (
    <StyledIconButtonAtom
      onClick={onClick}
      enableRipple
      size="medium"
      jsxElementButton={
        <Image
          src={imageSrc}
          alt={url + imageSrc}
          width={PRIVATE_DEFAULT_WIDTH_HEIGHT}
          height={PRIVATE_DEFAULT_WIDTH_HEIGHT}
        />
      }
    />
  )
}

export default StyledImageButtonAtom
