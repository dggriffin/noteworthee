
import {connect} from 'react-redux';
import Noteboard from 'components/Noteboard';
import {loadNotes} from 'actions/NoteActions';

const mapStateToProps = (state) => {
  return {
    viewReady: !state.notes.loading,
    notes: state.notes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(loadNotes('test', 'test2'));
    }
  }
};

const NoteboardContainer2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(Noteboard);

export default NoteboardContainer2;
