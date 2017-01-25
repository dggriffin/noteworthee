import { NAVIGATE } from '../constants/ActionTypes'

export default function navigate(state = '/', action) {
  switch (action.type) {
    case NAVIGATE:
      return action.route;

    default:
      return state;
  }
}
