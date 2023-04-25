import ContinueWithGoogle from '@/components/atom_continue_with/index.google'
import { FC, Fragment } from 'react'

const SignInPage: FC = () => {
  return (
    <Fragment>
      <h3>{`Welcome Back!`}</h3>
      <ContinueWithGoogle />
    </Fragment>
  )
}

export default SignInPage
