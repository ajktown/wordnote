import { FC } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const WordCardUnknown: FC = () => {
  return (
    <Card style={{ width: `100%`, borderRadius: 9 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`You have no access to this word card, or it is already deleted.`}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default WordCardUnknown
