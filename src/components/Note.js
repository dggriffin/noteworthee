import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import HappyIcon from 'material-ui/svg-icons/social/mood';
import SadIcon from 'material-ui/svg-icons/social/mood-bad';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      commentValue: ''
    };
  }

  handleToggleComments(){
    this.setState({expanded: !this.state.expanded})
  }

  handleCommentChange(event){
    this.setState({
      commentValue: event.target.value
    });
  }

  handleLike() {
    this.props.handleLike();
  }

  getElapsedTime() {
    var date = new Date(this.props.dateCreated);
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

  handleSubmitComment() {
    this.props.handleSubmitComment(this.state.commentValue);
    this.setState({commentValue: ''});
  }

  renderCommentSection() {
    let comments = [];
    if (this.props.comments) {
      comments = this.props.comments.map( comment =>
        [
          <MenuItem key={comment}>
            <p style={{whiteSpace: 'normal', overflow: 'hidden'}}>
              {comment}
            </p>
          </MenuItem>,
          <Divider />
        ]
      );
    }
    return [ comments,
      <TextField
        key='field'
        floatingLabelText="Comment"
        onChange={this.handleCommentChange.bind(this)}
        value={this.state.commentValue}
        />,
      <RaisedButton
        key='button'
        primary={true}
        label='Submit'
        onClick={this.handleSubmitComment.bind(this)}/>
    ];
  }

  render() {
    return (
      <Card
        expanded={this.state.expanded}
        style={{maxWidth: 300, margin: '.5em'}}
        expandable={true}>
        <CardHeader
          title={this.props.message}
          avatar={this.props.mood === 'happy' ? <HappyIcon style={{fill: '#7BD1EE', width: 50, height: 50}}/> : <SadIcon style={{fill: '#EF5A8F', width: 50, height: 50}}/>}
          actAsExpander={true}
          titleColor={'#646464'}
          subtitle={`${this.getElapsedTime()} ago`}
          subtitleStyle={{paddingTop: '1em'}}
          />
        <CardActions>
          <FlatButton
            primary={true}
            label={`${localStorage.getItem(this.props.id) === 'true' ? 'Unlike' : 'Like'} (${this.props.likes})`}
            onClick={this.handleLike.bind(this)}
          />
          <FlatButton
            secondary={true}
            label={` ${this.state.expanded ? 'Hide Comments' : 'Comment'} (${this.props.comments ? this.props.comments.length : '0'})`}
            onClick={this.handleToggleComments.bind(this)}
          />
        </CardActions>
        <CardText expandable={true}>
          {this.renderCommentSection()}
        </CardText>
      </Card>
    );
  }
}

export default Note;
