import { FC } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useRecoilValue } from 'recoil'
import { isFirstTimeUserSelector } from '@/states/app/app.selectors'

const FirstTimeUserConfetti: FC = () => {
  const { width, height } = useWindowSize()
  const isFirstTimeUser = useRecoilValue(isFirstTimeUserSelector)

  if (!isFirstTimeUser) return null
  return <Confetti width={width} height={height} recycle={false} />
}

export default FirstTimeUserConfetti
