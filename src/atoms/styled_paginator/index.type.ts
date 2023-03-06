export type ButtonType = 'FirstPage' | 'BeforePage' | 'NextPage' | 'LastPage'

export type ButtonData = {
  id: ButtonType
  title: string
  icon: JSX.Element
}
