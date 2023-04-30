import { ContinueWithChunk } from '@/components/molecule_continue_with_chunk'
import { useIsAppBooted } from '@/hooks/\bapp/use-is-app-booted.hook'
import StyledBackdrop from '@/organisms/StyledBackdrop'
import StyledCentered from '@/organisms/StyledCentered'
import { FC } from 'react'

const SignUpPage: FC = () => {
  if (!useIsAppBooted()) return <StyledBackdrop />

  return (
    <StyledCentered>
      <h3>{`Create your account by choosing your single sign-on account`}</h3>
      <ContinueWithChunk />
    </StyledCentered>
  )
}

export default SignUpPage
