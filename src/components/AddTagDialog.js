import React from 'react';
import { Dialog, FlatButton, TextField, Chip } from 'material-ui';

class AddTagDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagValue: '',
      tagError: '',
      tagList: []
    };
  }

  handleDialogClose() {
    this.setState({
      dialogOpen: false,
      tagValue: '',
      tagList: [],
      tagError: ''
    });
    this.props.handleDialogClose();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dialogOpen: nextProps.dialogOpen});
  }


  handleSubmitTags() {
    this.props.handleSubmitTags(this.state.tagList);

    this.setState({
      dialogOpen: false,
      tagValue: '',
      tagList: [],
      tagError: ''
    });
  }

  handleTagChange(event, tagValue) {
    this.setState({tagValue});
  }

  handleAddTag() {
    let tags = this.state.tagValue.split(',');
    let trimmedTags = tags.map((tag) => {
      return tag.trim();
    });
    let filteredTags = trimmedTags.filter((tag) => {
      return tag.length;
    });
    this.setState({tagList: this.state.tagList.concat(filteredTags), tagValue: ''});
  }

  handleTagDelete(removeTag) {
    let filteredTags = this.state.tagList.filter((tag) => {
      return tag !== removeTag;
    });
    this.setState({tagList: filteredTags});
  }

  renderTagChips() {
    return this.state.tagList.map((tag) => {
      return <Chip style={{margin: 2}} onRequestDelete={this.handleTagDelete.bind(this, tag)}>
                {tag}
             </Chip>
    })
  }

  validateDialog() {
    if (!this.state.messageValue.trim().length > 0) {
        this.setState({messageError: 'Message field can\'t be empty!'})
        return false;
    }
    return true;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.handleDialogClose.bind(this)}
        />
      ,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmitTags.bind(this)}
        />

    ];

    return (
      <Dialog
        title="Add Tags"
        actions={actions}
        modal={false}
        open={this.state.dialogOpen}
        onRequestClose={this.handleDialogClose.bind(this)}
        titleStyle={{fontWeight: 800, color: '#979797'}}
        >
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{fontWeight: 600, fontSize: '1.2em', color: '#979797', paddingTop: 45, paddingBottom: 5}}>
            Tags
          </span>
          <span style={{color: '#979797'}}>
            Enter comma-separated tags for your note.
          </span>
          <div>
            <TextField
              style={{width:'70%'}}
              hintText='Example: silly, idea, improvement'
              value={this.state.tagValue}
              onChange={this.handleTagChange.bind(this)}
              errorText={this.state.tagError}
              multiLine={true}
            />
            <FlatButton
              label="add tag"
              primary={true}
              onClick={this.handleAddTag.bind(this)}
              />
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {this.renderTagChips()}
          </div>
        </div>
      </Dialog>
    );
  }
}

export default AddTagDialog;
