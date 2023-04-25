import ContinueWithGoogle from '@/components/atom_continue_with/index.google'
import { FC, Fragment } from 'react'

const SignUpPage: FC = () => {
  return (
    <Fragment>
      <h3>{`Create your account by choosing your single sign-on account`}</h3>
      <ContinueWithGoogle />
    </Fragment>
  )
}

export default SignUpPage
