"use strict"
//step 3 define reducers. Reducers take two args. state, action. You return state.
export function booksReducers(state={
  books:[ ]
}, action){
  switch (action.type) {
    case "GET_BOOKS":
    return {...state, books:[...action.payload]}
    break
    case "POST_BOOK":
    // let books =
    state.books.concat(action.payload)
    return {...state,books:[...state.books, ...action.payload], msg:'Saved! Click to continue',
    style:'success', validation:'success'}
    break
    case "POST_BOOK_REJECTED":
    return {...state, msg: 'Please Try Again', style:'danger', validation:'error'}
    break
    case "RESET_BUTTON":
    return {...state, msg: null, style:'primary', validation:null}
    break
    case "DELETE_BOOK":
    // Create a copy of the current array of books
    const currentBookToDelete= [...state.books]
    //Determine at which index in books array is the book to be deleted
    const indexToDelete = currentBookToDelete.findIndex(
      function(book) {
        return book._id == action.payload
      }
    )
    //use slice to remove the book at the specified index
    return {books: [...currentBookToDelete.slice(0, indexToDelete),
      ...currentBookToDelete.slice(indexToDelete + 1)]}
      break
      case "UPDATE_BOOK":
      // Create a copy of the current array of books
      const currentBookToUpdate= [...state.books]
      //Determine at which index in books array is the book to be deleted
      const indexToUpdate = currentBookToUpdate.findIndex(
        function(book) {
          return book._id == action.payload
        }
      )
      // Create a new book object with the new values and with the same array index of the
      // item we want to replace. To achieve this we will use ... but we could use concat
      // method too
      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        title: action.payload.title
      }
      // This is what newBookToUpdate looks like
      console.log("newBookToUpdate", newBookToUpdate)

      // Use slice to remove the book at the specified index, replace with the new object
      // and concat with the rest of items in the array.
      return {books:
    [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
     ...currentBookToUpdate.slice(indexToUpdate + 1)]}
     break
  }
  return state
}
