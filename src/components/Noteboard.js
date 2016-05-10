import styles from 'styles/Noteboard.css';
import React from 'react';
import { Paper } from 'material-ui';
import FlipMove from 'react-flip-move';
import Rebase from 're-base';
import Note from 'components/Note'
const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');

class Noteboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  renderNotes() {
    return this.state.notes.map( note =>
      <div key={note.key}>
        <Note id={note.key}/>
      </div>
    );
  }

  render() {
    return (
      <FlipMove
        className={styles.content}
        enterAnimation="elevator"
        leaveAnimation="elevator">
        { this.renderNotes() }
      </FlipMove>
    );
  }
}


export default Noteboard;
