import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { FC } from 'react'

interface Props {
  label: string
}
const TagButtonCustomized: FC<Props> = ({ label }) => {
  return (
    <StyledTagButtonAtom
      label={"#" + label}
    />
  )
}

export default TagButtonCustomized