// Utils
import * as actionTypes from './actionTypes'

const initialState = {
  name: null,
  image: null,
}

const setUser = (state, action) => {
  return {
    ...state,
    name: action.display_name,
    image: action.images[0],
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_SET:
      return setUser(state, action)
    case actionTypes.USER_RESET:
      return initialState
    default:
      return state
  }
}
