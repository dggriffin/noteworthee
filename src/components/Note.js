import styles from 'styles/Note.css';
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import HappyIcon from 'material-ui/svg-icons/social/mood';
import SadIcon from 'material-ui/svg-icons/social/mood-bad';

import Rebase from 're-base';
const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      commentValue: '',
      data: {
        comments: [],
        likes: 0
      },
      ...props,
    };
  }

  componentDidMount(){
    this.ref = base.syncState(`notes/${this.state.id}`, {
      context: this,
      state: 'data',
      asArray: false
    });
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  handleToggleComments(){
    this.setState({expanded: !this.state.expanded});
  };

  handleCommentChange(event){
    this.setState({
      commentValue: event.target.value,
    });
  }

  handleLike(){
    this.setState({
      data: {
        ...this.state.data,
        likes: this.state.data.likes+1
      }
    });
  }

  getElapsedTime(){
    var date = new Date(this.state.data.dateCreated);
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

  handleSubmitComment(){
    let comments = this.state.data.comments ? this.state.data.comments : [];
    this.setState({
      data: {
        ...this.state.data,
        comments: comments.concat([this.state.commentValue])
      }
    });
    this.setState({commentValue: ''});
  }

  renderCommentSection(){
    let comments = [];
    if (this.state.data.comments) {
      comments = this.state.data.comments.map( comment =>
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
        style={{width: 300, margin: '.5em'}}
        expandable={true}>
        <CardHeader
          title={this.state.data.message}
          avatar={this.state.data.mood === 'happy' ? <HappyIcon style={{fill: '#7BD1EE', width: 50, height: 50}}/> : <SadIcon style={{fill: '#EF5A8F', width: 50, height: 50}}/>}
          actAsExpander={true}
          titleColor={'#646464'}
          subtitle={this.getElapsedTime()}
          />
        <CardActions>
          <FlatButton
            primary={true}
            label={`Like (${this.state.data.likes})`}
            onClick={this.handleLike.bind(this)}/> />
          <FlatButton
            secondary={true}
            label={` ${this.state.expanded ? 'Hide Comments' : 'Comment'} (${this.state.data.comments ? this.state.data.comments.length : '0'})`}
            onClick={this.handleToggleComments.bind(this)}/>
        </CardActions>
        <CardText expandable={true}>
          {this.renderCommentSection()}
        </CardText>
      </Card>
    );
  }
}

export default Note;
