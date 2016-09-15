import styles from 'styles/Noteboard.css';
import React from 'react';
import FlipMove from 'react-flip-move';
import NoteContainer from 'containers/NoteContainer'
import { Paper, CircularProgress, SelectField, MenuItem, FloatingActionButton, IconButton } from 'material-ui';
import HappyIcon from 'material-ui/svg-icons/social/mood';
import SadIcon from 'material-ui/svg-icons/social/mood-bad';
import SortIcon from 'material-ui/svg-icons/content/sort';
import MoreDetailsIcon from 'material-ui/svg-icons/action/chrome-reader-mode';
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
      sortValue: 'likes'
    };
  }

  renderNotes() {
    let notes = this.getFilteredNotes();
    if (!notes.length) {
       return <div className={styles.noNotes}> No notes to display! </div>
    }
    return notes.map( note =>
      <div key={`${note.dateCreated}-${this.props.teamName}-${this.props.boardName}`}>
        <NoteContainer
          id={`${note.dateCreated}-${this.props.teamName}-${this.props.boardName}`}
          index={note.key}
          team={this.props.teamName}
          board={this.props.boardName}
        />
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

  getLatestPostTime() {
    return this.getElapsedTime(_.max(this.props.notes, 'dateCreated').dateCreated);
  }

  getElapsedTime(time) {
    var date = new Date(time);
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + ' years';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
  }

  render() {
    return (
      <Paper style={{width: '100%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#f7f7f7'}}>
        <div className={styles.toolbar}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
            <div style={{display: 'flex', flexDirection:'column', justifyContent:'center'}}>
              <span className={styles.boardName}> #{this.props.boardName}</span>
              <span className={styles.lastPost}> Last Post: {this.getLatestPostTime() !== 'NaN seconds' ? this.getLatestPostTime() + ' ago' : 'Never!'}</span>
            </div>
            <span style={{display: 'flex'}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <SortIcon color='#EF5A8F' style={{marginLeft: 0}} />
                <SelectField
                  value={this.state.sortValue}
                  onChange={this.handleSortChange.bind(this)}
                  style={{marginLeft: 5, width: 110}}
                >
                  <MenuItem value={'likes'} primaryText='Likes' />
                  <MenuItem value={'dateCreated'} primaryText='Recent' />
                </SelectField>
              </div>
              <IconButton
                  tooltip="Toggle Happy Notes"
                  tooltipPosition="top-center"
                  onClick={this.handleToggleHappy.bind(this)} >
                <HappyIcon color={this.state.showHappy ? '#EF5A8F' : '#dedede'}/>
              </IconButton>
              <IconButton
                  tooltip="Toggle Sad Notes"
                  tooltipPosition="top-center"
                  onClick={this.handleToggleSad.bind(this)} >
                <SadIcon color={this.state.showSad ? '#EF5A8F' : '#dedede'}/>
              </IconButton>
              <IconButton
                  tooltip="Show Tag Filters"
                  tooltipPosition="top-center" >
                <MoreDetailsIcon color='#646464'/>
              </IconButton>
            </span>
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
