import * as actionTypes from "./actionTypes"

const initialState = {
  featuredPlaylists: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_ENTITIES:
      return Object.keys(action.entities).reduce(
        (merged, type) => ({
          ...merged,
          [type]: { ...merged[type], ...action.entities[type] },
        }),
        state
      )
    default:
      return state
  }
}
