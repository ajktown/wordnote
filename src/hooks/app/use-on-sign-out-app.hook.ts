import { useRecoilCallback } from 'recoil'
import { useRouter } from 'next/router'
import { PageConst } from '@/constants/pages.constant'
import { wordIdsState } from '@/states/words/words.state'
import { postSignOut } from '@/api/auth/post-sign-out.api'
import { preferenceState } from '@/states/preferences/preference.state'

export const useOnSignOutApp = () => {
  const router = useRouter()

  const onSignOutApp = useRecoilCallback(
    ({ reset }) =>
      async () => {
        try {
          await postSignOut()
        } finally {
          reset(wordIdsState)
          reset(preferenceState)
          router.push(PageConst.Welcome)

          // TODO: Should set a snackbar for a reason.
        }
      },
    [router],
  )

  return onSignOutApp
}
