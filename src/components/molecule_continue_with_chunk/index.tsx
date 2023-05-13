import { Stack } from '@mui/material'
import { FC } from 'react'
import ContinueWithGoogle from '@/components/atom_continue_with/index.google'
import ContinueWithMicrosoft from '@/components/atom_continue_with/index.ms'
import ContinueWithDeveloperToken from '../atom_continue_with/index.dev'

export const ContinueWithChunk: FC = () => {
  return (
    <Stack spacing={1}>
      <ContinueWithGoogle />
      <ContinueWithMicrosoft />
      <ContinueWithDeveloperToken />
    </Stack>
  )
}
