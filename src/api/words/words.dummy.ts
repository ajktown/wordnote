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
    languageCode: `en`,
    isFavorite: true,
    term: `breadth`,
    pronunciation: `breth`,
    definition: `폭 (Breadth First Search, BFS) (broad)`,
    example: ``,
    tags: [`algorithm`],
  },
  {
    id: DummyWordId.element2,
    languageCode: `en`,
    isFavorite: false,
    term: `insinuated`,
    pronunciation: ``,
    definition: `(자기에게 유리한 일을 하기 위해 환심·존경 등을) 사다`,
    example: `I never thought it insinuated date rape.`,
    tags: [],
  },
]
