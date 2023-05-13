import { PageConst } from '@/constants/pages.constant'
import { useGoogleOneTabSignIn } from '@/hooks/auth/use-google-one-tab-sign-in.hook'
import StyledCentered from '@/organisms/StyledCentered'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'

const WelcomePage: FC = () => {
  const router = useRouter()
  useGoogleOneTabSignIn()

  const onClickSignIn = useCallback(() => {
    router.push(PageConst.SignIn)
  }, [router])

  const onClickSignUp = useCallback(() => {
    router.push(PageConst.SignUp)
  }, [router])

  return (
    <StyledCentered>
      <h3>{`Welcome to AJK Town's Wordnote.`}</h3>
      <h3>{`Sign in with your AJK Town account to continue.`}</h3>
      <Button onClick={onClickSignIn}> {`Sign in`}</Button>
      <Button onClick={onClickSignUp}> {`Sign up`}</Button>
    </StyledCentered>
  )
}

export default WelcomePage
