export const ADD_TO_BOOKMARK_LIST = 'ADD_TO_BOOKMARK_LIST';
export const REMOVE_FROM_BOOKMARK_LIST = 'REMOVE_FROM_BOOKMARK_LIST';


export const addBookmark = book => dispatch => {
    dispatch({
      type: ADD_TO_BOOKMARK_LIST,
      payload: book
    });
  };
  
  export const removeBookmark = book => dispatch => {
    dispatch({
      type: REMOVE_FROM_BOOKMARK_LIST,
      payload: book
    });
  };