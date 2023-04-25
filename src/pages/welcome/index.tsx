import { PageConst } from '@/constants/pages.constant'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, Fragment, useCallback } from 'react'

const WelcomePage: FC = () => {
  const router = useRouter()

  const onClickSignIn = useCallback(() => {
    router.push(PageConst.SignIn)
  }, [router])

  const onClickSignUp = useCallback(() => {
    router.push(PageConst.SignUp)
  }, [router])
  return (
    <Fragment>
      <h3>{`Welcome to AJK Town's Wordnote.`}</h3>
      <h3>{`Sign in with your AJK Town account to continue.`}</h3>
      <Button onClick={onClickSignIn}> {`Sign in`}</Button>
      <Button onClick={onClickSignUp}> {`Sign up`}</Button>
    </Fragment>
  )
}

export default WelcomePage
