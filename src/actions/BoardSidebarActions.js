import * as types from '../constants/ActionTypes';
const Rebase = require('re-base');
const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');

export function loadBoards() {
  return (dispatch, getState) => {

    dispatch(fetchBoardsRequest());

    let { routing } = getState();
    const pathList = routing.locationBeforeTransitions.pathname.split('/');

    mountBoardsToClient(pathList[1])
    .then((boards) => {
      dispatch(fetchBoardsSuccess(boards));
    });
  }
}

function mountBoardsToClient(teamName) {
  return new Promise( (resolve, reject) => {
    base.fetch(`teams/${teamName}`, {
      context: {},
      asArray: true,
      then(boards) {
        resolve(boards);
      }
    });
  });
}

function fetchBoardsRequest() {
  return { type: types.FETCH_BOARDS_REQUEST };
}

function fetchBoardsSuccess(boards) {
  return { type: types.FETCH_BOARDS_SUCCESS, boards };
}
