import { ContinueWithChunk } from '@/components/molecule_continue_with_chunk'
import StyledCentered from '@/organisms/StyledCentered'
import { FC } from 'react'

const SignInPage: FC = () => {
  return (
    <StyledCentered>
      <h3>{`Welcome Back!`}</h3>
      <ContinueWithChunk />
    </StyledCentered>
  )
}

export default SignInPage
