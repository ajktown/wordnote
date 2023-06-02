import axios from 'axios'

export const deleteWordByIdApi = async (wordId: string): Promise<void> => {
  const url = `/v1/words/${wordId}`
  return axios.delete(url)
}
