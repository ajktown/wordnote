//* Recoil Key Prefix */
// We manage Key Prefix so that we never get a collision between keys that are defined in different files.
export enum Rkp {
  App = `App`,
  Words = `Words`,
  Preferences = `Preferences`,
  SharedResource = `SharedResource`,
  Tags = `Tags`,
  Semesters = `Semesters`,
  SearchInput = `SearchInput`,
}

//*  Recoil Key Suffix */
export enum Rks {
  Family = `Family`,
  Dialog = `Dialog`,
  SelectorFamily = `SelectorFamily`,
  Selector = `Selector`,
}
