import { FC } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const FirstTimeUserConfetti: FC = () => {
  const { width, height } = useWindowSize()

  return <Confetti width={width} height={height} />
}

export default FirstTimeUserConfetti
