import { ContinueWithChunk } from '@/components/molecule_continue_with_chunk'
import StyledCentered from '@/organisms/StyledCentered'
import { FC } from 'react'

const SignUpPage: FC = () => {
  return (
    <StyledCentered>
      <h3>{`Create your account by choosing your single sign-on account`}</h3>
      <ContinueWithChunk />
    </StyledCentered>
  )
}

export default SignUpPage
