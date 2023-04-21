import { Button } from '@mui/material'
import { FC, Fragment } from 'react'

const SignInPage: FC = () => {
  return (
    <Fragment>
      <h3>{`Note for developer: the AJK Town logo will be on the center.`}</h3>
      <h3>{`Welcome to AJK Town's Wordnote.`}</h3>
      <h3>{`Sign in with your account to continue.`}</h3>
      <h3>{`Note for developer: the one tab of Google will be implemented.`}</h3>
      <Button> {`Sign in`}</Button>
      <Button> {`Sign up`}</Button>
    </Fragment>
  )
}

export default SignInPage
