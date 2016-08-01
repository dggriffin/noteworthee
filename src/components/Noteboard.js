import styles from 'styles/Noteboard.css';
import React from 'react';
import FlipMove from 'react-flip-move';
import NoteContainer from 'containers/NoteContainer'
import { Paper, FlatButton, CircularProgress, SelectField, MenuItem, FloatingActionButton } from 'material-ui';
import SortIcon from 'material-ui/svg-icons/content/sort';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import _ from 'underscore';

const defaultProps = {
  notes: [],
  loading: true,
  handleArchiveClick: () => {},
  handleDialogOpen: () => {}
};

class Noteboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSad: true,
      showHappy: true,
      sortValue: 'dateCreated'
    };
  }

  renderNotes() {
    return this.getFilteredNotes().map( note =>
      <div key={`${note.dateCreated}-${this.props.teamName}-${this.props.boardName}`}>
        <NoteContainer id={`${note.dateCreated}-${this.props.teamName}-${this.props.boardName}`} index={note.key} team={this.props.teamName} board={this.props.boardName} />
      </div>
    );
  }

  getFilteredNotes() {
    return _.sortBy(_.filter(this.props.notes, (note) => {
      switch (note.mood) {
        case 'happy':
          return this.state.showHappy;
        case 'sad':
          return this.state.showSad;
      }
    }), this.state.sortValue).reverse();
  }

  handleToggleHappy() {
    this.setState({showHappy: !this.state.showHappy});
  }

  handleToggleSad() {
    this.setState({showSad: !this.state.showSad});
  }

  handleSortChange(event, index, sortValue) {
    this.setState({sortValue});
  }

  render() {
    return (
      <Paper style={{width: '100%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#f7f7f7'}}>
        <div className={styles.toolbar}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <SortIcon color='#EF5A8F' style={{marginLeft: 0}} />
              <SelectField
                value={this.state.sortValue}
                onChange={this.handleSortChange.bind(this)}
                style={{marginLeft: 5, width: 110}}
              >
                <MenuItem value={'dateCreated'} primaryText='Recent' />
                <MenuItem value={'likes'} primaryText='Likes' />
              </SelectField>
            </div>
            <FlatButton
              label={this.state.showHappy ? 'Hide Happy' : 'Show Happy'}
              secondary={true}
              onClick={this.handleToggleHappy.bind(this)} />
            <FlatButton
              label={this.state.showSad ? 'Hide Sad' : 'Show Sad'}
              secondary={true}
              onClick={this.handleToggleSad.bind(this)} />
          </div>
          <div className={styles.floatingActionButton}>
            <FloatingActionButton
              secondary={true}
              onClick={this.props.handleDialogOpen.bind(this)}>
              <ContentAddIcon/>
            </FloatingActionButton>
          </div>
        </div>
        { this.props.loading ? <div style={{height: '82vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress size={3}/></div> :
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

Noteboard.defaultProps = defaultProps;

export default Noteboard;
