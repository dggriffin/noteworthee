import React from 'react';
import Note from 'components/Note';
import Rebase from 're-base';
const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');

class NoteboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        comments: [],
        likes: 0
      }
    };
  }

  componentDidMount() {
    this.ref = base.syncState(`teams/${this.props.team}/${this.props.board}/${this.props.index}`, {
      context: this,
      state: 'data',
      asArray: false
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleLike() {
    if (localStorage.getItem(this.props.id) === 'true') {
      this.setState({
        data: {
          ...this.state.data,
          likes: this.state.data.likes-1
        }
      });
      localStorage.setItem(this.props.id, false);
    }
    else {
      this.setState({
        data: {
          ...this.state.data,
          likes: this.state.data.likes+1
        }
      });
      localStorage.setItem(this.props.id, true);
    }
  }

  handleSubmitComment(commentValue) {
    let comments = this.state.data.comments ? this.state.data.comments : [];
    this.setState({
      data: {
        ...this.state.data,
        comments: comments.concat([commentValue])
      }
    });
    this.setState({commentValue: ''});
  }

  render() {
    return (
      <Note
        handleSubmitComment={this.handleSubmitComment.bind(this)}
        handleLike={this.handleLike.bind(this)}
        {...this.state.data}
        {...this.props}
      />
    );
  }
}

export default NoteboardContainer;
