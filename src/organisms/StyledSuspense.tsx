import { FC, Suspense } from 'react'

interface Props {
  children?: JSX.Element[] | JSX.Element
}

// This is a legit troll component, but I love it.
const PrivateStyledNull: FC = () => null

const StyledSuspense: FC<Props> = ({ children }) => {
  return <Suspense fallback={<PrivateStyledNull />}>{children}</Suspense>
}

export default StyledSuspense
