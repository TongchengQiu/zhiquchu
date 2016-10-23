// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE';

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange(location = '/') {
  return {
    type: LOCATION_CHANGE,
    payload: location
  };
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
/* eslint-disable */
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation));
}
/* eslint-enable */

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function locationReducer(state = initialState, action) {
  return action.type === LOCATION_CHANGE
    ? action.payload
    : state;
}
