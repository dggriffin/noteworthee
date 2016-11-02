require('styles/index.css');

import styles from 'styles/TeamView.css'
import React from 'react';
import Rebase from 're-base';
import NoteboardContainer from 'containers/NoteboardContainer';
import NoteDialogContainer from 'containers/NoteDialogContainer';
import AddTagDialogContainer from 'containers/AddTagDialogContainer';
import BoardSidebarContainer from 'containers/BoardSidebarContainer';
import TagSidebarContainer from 'containers/TagSidebarContainer';
import { TextField, RaisedButton } from 'material-ui';
import { browserHistory} from 'react-router';

const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');

class TeamView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      tagDialogOpen: false,
      tagSideBarOpen: false,
      tagDialogData: {},
      boardValue: '',
      ...props
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({...nextProps});
  }

  // handleArchiveClick(){
  //   base.push(`archives/${this.state.params.teamName}/${this.state.params.boardName}/${new Date().toISOString().split('T')[0]}`, {
  //     data: this.state.notes
  //   });
  //   this.setState({
  //     notes: []
  //   });
  // }

  handleDialogOpen() {
    this.setState({dialogOpen: true});
  }

  handleDialogClose() {
    this.setState({dialogOpen: false});
  }

  handleTagSidebarOpen() {
    this.setState({tagSideBarOpen: true});
  }

  handleTagSidebarClose() {
    this.setState({tagSideBarOpen: false});
  }

  handleTagDialogOpen(note, tagList) {
    this.setState({tagDialogOpen: true, tagDialogData: {note, tagList}});
  }

  handleTagDialogClose() {
    this.setState({tagDialogOpen: false});
  }

  handleBoardChange(event) {
    this.setState({boardValue: event.target.value});
  }

  handleBoardSubmit(){
    browserHistory.push(`/${this.state.params.teamName}/${this.state.boardValue}`);
    base.fetch(`teams/${this.state.params.teamName}/${this.state.boardValue}`, {
      context: this,
      then(data) {
        if (!data) {
          base.push(`teams/${this.state.params.teamName}/${this.state.boardValue}`, {
            data: true
          });
        }
      }
    });
    this.setState({boardValue: ''});
  }

  render() {
    return (
        <div className={styles.teamContent}>
          <BoardSidebarContainer
            teamName={this.state.params.teamName}
            boardName={this.state.boardValue || this.state.params.boardName}
          />
          {
            this.state.params.boardName ?
            <NoteboardContainer
              handleDialogOpen={this.handleDialogOpen.bind(this)}
              handleTagDialogOpen={this.handleTagDialogOpen.bind(this)}
              handleTagSidebarOpen={this.handleTagSidebarOpen.bind(this)}
              teamName={this.state.params.teamName}
              boardName={this.state.params.boardName}
            /> :
            <div className={styles.noBoard}>
              Welcome to the <b style={{color: '#EF5A8F'}}>{this.state.params.teamName} noteworthee!</b>
              <br/>
              Create a board!
              <div className={styles.boardCreatorRow}>
                <div className={styles.boardCreatorTextField}>
                  <TextField
                    floatingLabelText="Enter Board Name"
                    value={this.state.boardValue}
                    onChange={this.handleBoardChange.bind(this)}
                    style={{fontWeight: '500'}}
                  />
                </div>
                  <RaisedButton
                    secondary={true}
                    label='Go!'
                    style={{height: '100%'}}
                    labelStyle={{height:'100%', fontSize: '1em'}}
                    onClick={this.handleBoardSubmit.bind(this)}
                  />
              </div>
            </div>
          }
          <NoteDialogContainer
            dialogOpen={this.state.dialogOpen}
            handleDialogClose={this.handleDialogClose.bind(this)}
            teamName={this.state.params.teamName}
            boardName={this.state.params.boardName}
          />
          <AddTagDialogContainer
            dialogOpen={this.state.tagDialogOpen}
            handleDialogClose={this.handleTagDialogClose.bind(this)}
            teamName={this.state.params.teamName}
            boardName={this.state.params.boardName}
            {...this.state.tagDialogData}
          />
          <TagSidebarContainer
            teamName={this.state.params.teamName}
            boardName={this.state.params.boardName}
            sidebarOpen={this.state.tagSideBarOpen}
          />
        </div>
    );
  }
}

export default TeamView;
