import { FC } from 'react'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'
import { envLambda } from '@/lambdas/get-env.lambda'
import { useRecoilValue } from 'recoil'
import { isWordPostedDailyState } from '@/recoil/action-groups/action-groups.state'

/** Simply renders a message that the end user is using archive mode.
 * Else, simply returns null, representing it is using normal mode.
 */
const AppbarToConsistencyPageButtonPart: FC = () => {
  const consistencyPage = envLambda.getConsistencyUrl()
  const isWordPostedDaily = useRecoilValue(isWordPostedDailyState)
  const onOpenNewTab = useOpenNewTab(consistencyPage)

  if (isWordPostedDaily === null) return null

  return (
    <StyledTextButtonAtom
      title={isWordPostedDaily ? `Well done!` : `Go add word please`}
      onClick={onOpenNewTab}
      isLoading={isWordPostedDaily === undefined}
    />
  )
}

export default AppbarToConsistencyPageButtonPart
