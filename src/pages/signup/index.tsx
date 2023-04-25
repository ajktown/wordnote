import ContinueWithGoogle from '@/components/atom_continue_with/index.google'
import StyledCentered from '@/organisms/StyledCentered'
import { FC } from 'react'

const SignUpPage: FC = () => {
  return (
    <StyledCentered>
      <h3>{`Create your account by choosing your single sign-on account`}</h3>
      <ContinueWithGoogle />
    </StyledCentered>
  )
}

export default SignUpPage
