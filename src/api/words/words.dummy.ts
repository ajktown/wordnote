import { WordData } from './words.interface'



enum DummyWordId {
  element1 = `2ce0dc45-4542-443b-9d20-f15f5d8c65e8`,
  element2 = `2ce0dc45-4542-443b-9d20-f15f5d8c65e9`,
  UnknownElement = `unknown_word_id_sample`,
}

export const DUMMY_WORD_IDS: DummyWordId[] = [
  DummyWordId.element1,
  DummyWordId.UnknownElement,
  DummyWordId.element2,
]

export const DUMMY_WORDS: WordData[] = [
  {
    id: DummyWordId.element1,
    isFavorite: true,
    term: `breadth`,
    pronunciation: `breth`,
    definition: `폭 (Breadth First Search, BFS) (broad)`,
    example: ``,
  },
  {
    id: DummyWordId.element2,
    isFavorite: false,
    term: `top`,
    pronunciation: ``,
    definition: `(can be also) favorite`,
    example: `Select your top colors, and we will send the samples!`,
  },
]