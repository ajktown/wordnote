import { FC } from 'react'
import { Skeleton, Card, CardContent, CardActions, Box } from '@mui/material'
import StyledSuspense from '@/organisms/StyledSuspense'

const WordCardSkeleton: FC = () => {
  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent>
          <Skeleton animation="wave" height={15} width="20%" />
          <Skeleton animation="wave" height={15} width="12%" />
          <Skeleton animation="wave" height={15} width="12%" />
          <Skeleton animation="wave" height={15} width="40%" />
        </CardContent>
        <CardActions>
          <Box sx={{ ml: 1 }} />
          <Skeleton
            animation="wave"
            variant="circular"
            width={20}
            height={20}
          />
          <Skeleton
            animation="wave"
            variant="circular"
            width={20}
            height={20}
          />
          <Skeleton animation="wave" height={15} width="5%" />
          <Skeleton animation="wave" height={15} width="5%" />
          <Skeleton animation="wave" height={15} width="5%" />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCardSkeleton
