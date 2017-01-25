import { FETCH_NOTES_SUCCESS } from '../constants/ActionTypes'

export default function notes(state = { loading: true }, action) {
  switch (action.type) {
    case FETCH_NOTES_SUCCESS:
      return {
        loading: false,
        ...action.notes
      }

    default:
      return state;
  }
}
