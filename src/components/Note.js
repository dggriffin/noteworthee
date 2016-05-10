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
      comments: [],
      expanded: false,
      commentValue: '',
      ...props,
    };
  }

  componentDidMount(){
    this.commentRef = base.syncState(`notes/${this.state.id}/comments`, {
      context: this,
      state: 'comments',
      asArray: true
    });

    this.likeRef = base.syncState(`notes/${this.state.id}/likes`, {
      context: this,
      state: 'likes'
    });
  }

  componentWillUnmount(){
    base.removeBinding(this.commentRef);
    base.removeBinding(this.likeRef);
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
      likes: this.state.likes+1
    });
  }

  handleSubmitComment(){
    this.setState({
      comments: this.state.comments.concat([this.state.commentValue])
    });
    this.setState({commentValue: ''});
  }

  renderCommentSection(){
    let comments = Object.keys(this.state.comments).map( key =>
      [
        <MenuItem key={key}>
          <p style={{whiteSpace: 'normal', overflow: 'hidden'}}>
            {this.state.comments[key]}
          </p>
        </MenuItem>,
        <Divider />
      ]
    );
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
          title={this.state.message}
          avatar={this.state.mood === 'happy' ? <HappyIcon style={{fill: '#7BD1EE', width: 50, height: 50}}/> : <SadIcon style={{fill: '#EF5A8F', width: 50, height: 50}}/>}
          actAsExpander={true}
          titleColor={'#646464'}
          />
        <CardActions>
          <FlatButton
            primary={true}
            label={`Like (${this.state.likes})`}
            onClick={this.handleLike.bind(this)}/> />
          <FlatButton
            secondary={true}
            label={` ${this.state.expanded ? 'Hide Comments' : 'Comment'} (${Object.keys(this.state.comments).length})`}
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
