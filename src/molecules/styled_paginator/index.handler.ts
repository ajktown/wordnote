import { ButtonType } from './index.data'

const FIRST_PAGE_NUMBER = 1

export const handleClickButton = (
  type: ButtonType,
  currentPage: number,
  totalPages: number,
  setCurrentPage: (newPageNumber: number) => any,
) => {
  switch (type) {
    case `FirstPage`:
      return setCurrentPage(1)
    case `BeforePage`:
      const beforePage = Math.max(FIRST_PAGE_NUMBER, currentPage - 1)
      return setCurrentPage(beforePage)
    case `NextPage`:
      const nextPage = Math.min(totalPages, currentPage + 1)
      return setCurrentPage(nextPage)
    case `LastPage`:
      return setCurrentPage(totalPages)
  }
}

export const getIsDisabled = (
  type: ButtonType,
  currentPage: number,
  totalPages: number,
): boolean => {
  if ([0, 1].includes(totalPages)) return true

  switch (type) {
    case `FirstPage`:
    case `BeforePage`:
      return currentPage === FIRST_PAGE_NUMBER
    case `NextPage`:
    case `LastPage`:
      return currentPage === totalPages
    default:
      return false
  }
}

// TODO: was refactored from this code: 
// export const getIsDisabled = (
//   type: ButtonType,
//   currentPage: number,
//   totalPages: number,
// ): boolean => {
//   if ([0, 1].includes(totalPages)) return true

//   switch (type) {
//     case `FirstPage`:
//       if (currentPage === 1) return true
//       break
//     case `BeforePage`:
//       if (currentPage === 1) return true
//       break
//     case `NextPage`:
//       if (currentPage === totalPages) return true
//       break
//     case `LastPage`:
//       if (currentPage === totalPages) return true
//       break
//     default:
//       return false
//   }
//   return false
// }
