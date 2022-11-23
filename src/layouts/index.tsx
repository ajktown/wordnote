import { FC, Fragment } from 'react'
import WordCard from '../components/molecule_word_card'
import { useWords } from '../hook/words/use-words.hook'

const HomeLayout: FC = () => {
  const words = useWords()[0]

  if (words === undefined) return <h3>"Loading..."</h3>

  return (
    <Fragment>
      {words.map(word => <WordCard key={word.id} word={word}/>)}
    </Fragment>
  )
}

export default HomeLayout