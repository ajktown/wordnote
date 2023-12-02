import { FC } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useRecoilValue } from 'recoil'
import { authPrepState } from '@/recoil/app/app.state'

const FirstTimeUserConfetti: FC = () => {
  const authPrep = useRecoilValue(authPrepState)
  const { width, height } = useWindowSize()

  if (!authPrep?.signedInUserInfo?.isFirstTimeUser) return null
  return <Confetti width={width} height={height} />
}

export default FirstTimeUserConfetti
