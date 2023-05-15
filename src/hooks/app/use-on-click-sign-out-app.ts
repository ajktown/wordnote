import { useRecoilCallback } from 'recoil'
import { useRouter } from 'next/router'
import { PageConst } from '@/constants/pages.constant'
import { wordIdsState } from '@/recoil/words/words.state'
import { postSignOut } from '@/api/auth/post-sign-out.api'

export const useOnClickSignOutApp = () => {
  const router = useRouter()

  const onClickSignOut = useRecoilCallback(
    ({ reset }) =>
      async () => {
        await postSignOut()
        reset(wordIdsState)
        router.push(PageConst.Welcome)
      },
    [router],
  )

  return onClickSignOut
}
