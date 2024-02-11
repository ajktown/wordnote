import { FC } from 'react'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'
import { envLambda } from '@/lambdas/get-env.lambda'

/** Simply renders a message that the end user is using archive mode.
 * Else, simply returns null, representing it is using normal mode.
 */
const AppbarToConsistencyPageButtonPart: FC = () => {
  const consistencyPage = envLambda.getConsistencyUrl()
  const onOpenNewTab = useOpenNewTab(consistencyPage)

  return (
    <StyledTextButtonAtom
      title="Go to Consistency Page"
      onClick={onOpenNewTab}
    />
  )
}

export default AppbarToConsistencyPageButtonPart
