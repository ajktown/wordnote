import ContinueWithGoogle from '@/components/atom_continue_with/index.google'
import StyledCentered from '@/organisms/StyledCentered'
import { FC } from 'react'

const SignInPage: FC = () => {
  return (
    <StyledCentered>
      <h3>{`Welcome Back!`}</h3>
      <ContinueWithGoogle />
    </StyledCentered>
  )
}

export default SignInPage
