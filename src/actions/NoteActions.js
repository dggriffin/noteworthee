import * as types from '../constants/ActionTypes';
const Rebase = require('re-base');
const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');

export function loadNotes(teamName, boardName) {
  return (dispatch) => {
    dispatch(mountNotesToClient(teamName, boardName))
    .then((notes) => {
      dispatch(fetchNotesSuccess(notes));
    });
  }
}

function mountNotesToClient(teamName, boardName) {
  return new Promise( (resolve, reject) => {
    base.listenTo(`teams/${this.props.teamName}/${boardName}`, {
      context: this,
      asArray: true,
      queries: {
        orderByChild: 'likes'
      },
      then(notes) {
        resolve(notes);
      }
    });
  });
}

function fetchNotesSuccess(notes) {
  return { type: types.FETCH_NOTES_SUCCESS, notes };
}
