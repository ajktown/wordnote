import { FC } from 'react'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'
import { envLambda } from '@/lambdas/get-env.lambda'
import { useRecoilValue } from 'recoil'
import { isWordPostedDailyState } from '@/states/action-groups/action-groups.state'
import StyledCircularLoading from '@/atoms/StyledCircularLoading'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

/**
 * Simply renders a message that the end user is using archive mode.
 * Else, simply returns null, representing it is using normal mode.
 */
const AppbarToConsistencyPageButtonPart: FC = () => {
  const consistencyPage = envLambda.getConsistencyUrl()
  const isWordPostedDaily = useRecoilValue(isWordPostedDailyState)
  const onOpenNewTab = useOpenNewTab(consistencyPage)

  if (isWordPostedDaily === null) return null

  if (isWordPostedDaily === undefined)
    return <StyledCircularLoading size={20} />
  if (isWordPostedDaily === false)
    return (
      <StyledIconButtonAtom
        hoverMessage={{
          title: `You have not posted a word today. Consistency is the key in your success and AJK Town highly recommends to post at least a word daily.`,
        }}
        onClick={onOpenNewTab}
        jsxElementButton={<WarningAmberIcon color="warning" fontSize="small" />}
      />
    )

  return (
    <StyledIconButtonAtom
      hoverMessage={{
        title: `You have accomplished posting a daily word. Keep up the good work!`,
      }}
      onClick={onOpenNewTab}
      jsxElementButton={
        <CheckCircleOutlineIcon color="success" fontSize="small" />
      }
    />
  )
}

export default AppbarToConsistencyPageButtonPart
