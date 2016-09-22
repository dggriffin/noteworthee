import React from 'react';
import {Chip} from 'material-ui';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import HappyIcon from 'material-ui/svg-icons/social/mood';
import SadIcon from 'material-ui/svg-icons/social/mood-bad';
import LinkIcon from 'material-ui/svg-icons/content/link';
import ThumbIcon from 'material-ui/svg-icons/action/thumb-up';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

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
            <p style={{whiteSpace: 'normal', overflow: 'hidden', lineHeight: 'normal'}}>
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
        multiLine={true}
        />,
      <RaisedButton
        key='button'
        primary={true}
        label='Submit'
        onClick={this.handleSubmitComment.bind(this)}/>
    ];
  }

  renderTags() {
    let tagList = this.props.tags;
    if (tagList && tagList.length) {
      return this.props.tags.map((tag) => {
        return <Chip style={{margin: 2}}>{tag}</Chip>
      });
    }
  }

  renderUrls() {
    let urlList = this.props.urlList;
    if (urlList && urlList.length) {
      return <CardText>
        <div style={{display: 'flex', flexDirection:'column'}}>
          <span style={{display: 'flex', color: 'grey', paddingBottom: 10}}>{`Links (${urlList.length})`}</span>
          {urlList.map((url) => {
            if (!url.match(/^[a-zA-Z]+:\/\//))
            {
                url = 'http://' + url;
            }
            let displayUrl = url;
            if (displayUrl.length > 30) {
              displayUrl = displayUrl.substr(0, 27) + '...';
            }
            return <MenuItem innerDivStyle={{paddingLeft: 35}} leftIcon={<LinkIcon style={{padding: 0, marginLeft: 0}}/>}><a target='_blank' href={url}>{displayUrl}</a></MenuItem>
          })}
        </div>
      </CardText>
    }
  }

  render() {
    return (
      <Card
        expanded={this.state.expanded}
        style={{maxWidth: 325, margin: '.5em'}}
        expandable={true}>
        <CardHeader
          title={this.props.name && this.props.name.trim() ? this.props.name.trim() : 'Anonymous' }
          avatar={this.props.mood === 'happy' ? <HappyIcon style={{fill: '#7BD1EE', width: 50, height: 50}}/> : <SadIcon style={{fill: '#EF5A8F', width: 50, height: 50}}/>}
          actAsExpander={true}
          titleColor={'#646464'}
          subtitle={`${this.getElapsedTime()} ago`}
          subtitleStyle={{paddingTop: '1em'}}
          />
        <CardText>
          {this.props.message}
        </CardText>
        {this.renderUrls()}
        <CardActions>
          <FlatButton
            primary={true}
            icon={<ThumbIcon/>}
            label={`${localStorage.getItem(this.props.id) === 'true' ? 'Unlike' : 'Like'} (${this.props.likes})`}
            onClick={this.handleLike.bind(this)}
          />
          <FlatButton
            secondary={true}
            icon={<CommentIcon/>}
            label={` ${this.state.expanded ? 'Hide Comments' : 'Comment'} (${this.props.comments ? this.props.comments.length : '0'})`}
            onClick={this.handleToggleComments.bind(this)}
          />
        </CardActions>
        <CardText expandable={true}>
          {this.renderCommentSection()}
        </CardText>
        <CardText style={{borderTop: '1px solid beige'}}>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {this.renderTags()}
          </div>
        </CardText>

      </Card>
    );
  }
}

export default Note;
