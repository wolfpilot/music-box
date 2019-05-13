import * as actionTypes from './actionTypes';

export const mergeEntities = entities => {
  return {
    type: actionTypes.MERGE_ENTITIES,
    entities
  };
};
