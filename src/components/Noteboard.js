import styles from 'styles/Noteboard.css';
import React from 'react';
import FlipMove from 'react-flip-move';
import Note from 'components/Note'
import { Paper, FlatButton, RaisedButton, CircularProgress } from 'material-ui';
import Cookies from 'cookies-js';

class Noteboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
    Cookies.set(props.board, props.noteCount);
  }

  componentWillReceiveProps(nextProps) {
    Cookies.set(nextProps.board, nextProps.noteCount);
    this.setState({
      ...nextProps
    });
  }

  renderNotes() {
    return this.state.notes.map( note =>
      <div key={`${note.key}-${this.state.team}-${this.state.board}`}>
        <Note id={`${note.key}-${this.state.team}-${this.state.board}`} index={note.key} team={this.state.team} board={this.state.board} />
      </div>
    );
  }

  render() {
    return (
      <Paper style={{width: '100%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#f7f7f7'}}>
        <div className={styles.toolbar}>
          <div style={{display: 'flex'}}>
            <FlatButton
              label={this.state.showHappy ? 'Hide Happy' : 'Show Happy'}
              secondary={true}
              onClick={this.state.handleToggleHappy.bind(this)} />
            <FlatButton
              label={this.state.showSad ? 'Hide Sad' : 'Show Sad'}
              secondary={true}
              onClick={this.state.handleToggleSad.bind(this)} />
          </div>
          <div style={{display: 'flex'}}>
            <FlatButton
              label="Archive"
              secondary={true}
              onClick={this.state.handleArchiveClick.bind(this)} />
            <RaisedButton
              label="+ Add Note"
              secondary={true}
              onClick={this.state.handleDialogOpen.bind(this)} />
          </div>
        </div>
        { this.state.loading ? <div style={{height: '82vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress size={3}/></div> :
          <FlipMove
            className={styles.content}
            enterAnimation="elevator"
            leaveAnimation="elevator">
            { this.renderNotes() }
          </FlipMove>
        }
      </Paper>
    );
  }
}


export default Noteboard;
