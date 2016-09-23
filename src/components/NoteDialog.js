import styles from 'styles/Note.css';
import React from 'react';
import { Dialog, FlatButton, TextField, Chip } from 'material-ui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import HappyIcon from 'material-ui/svg-icons/social/mood';
import HappyIconBorder from 'material-ui/svg-icons/social/mood';
import SadIcon from 'material-ui/svg-icons/social/mood-bad';
import SadIconBorder from 'material-ui/svg-icons/social/mood-bad';
import AddLink from 'components/AddLink';
import AddImage from 'components/AddImage';

export default class NoteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      messageValue: '',
      messageError: '',
      tagValue: '',
      tagError: '',
      tagList: [],
      moodState: 'happy',
      dialogOpen: this.props.dialogOpen,
      urlList: [],
      imageUrl: ''
    };
  }

  handleDialogClose() {
    this.setState({
      dialogOpen: false,
      moodState: 'happy',
      messageValue: '',
      messageError: '',
      tagValue: '',
      tagList: [],
      tagError: '',
      urlList: [],
      imageUrl: '',
      nameValue: ''
    });
    this.props.handleDialogClose();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dialogOpen: nextProps.dialogOpen});
  }

  componentWillUnmount() {
    this.setState({messageValue: '', messageError: ''});
  }

  handleMessageChange(event) {
    this.setState({
      messageValue: event.target.value
    });
  }

  handleMoodChange(event, value) {
    this.setState({moodState: value});
  }

  handleNameChange(event) {
    this.setState({
      nameValue: event.target.value
    });
  }

  handleAddNote() {
    if (!this.validateDialog()) {
      return;
    }
    let newNote = {
      messageValue: this.state.messageValue,
      moodState: this.state.moodState,
      urlList: this.state.urlList,
      imageUrl: this.state.imageUrl,
      tagList: this.state.tagList,
      name: this.state.nameValue
    };
    this.props.handleAddNote(newNote);

    this.setState({
      dialogOpen: false,
      moodState: 'happy',
      messageValue: '',
      messageError: '',
      tagValue: '',
      tagList: [],
      tagError: '',
      urlList: [],
      imageUrl: '',
      nameValue: ''
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

  handleUrlChange(urlList) {
    let trimmedList = urlList.filter((url) => {
      return url.trim().length;
    });
    this.setState({urlList: trimmedList});
  }

  handleImageUrlChange(imageUrl) {
    if (!imageUrl) {
      return;
    }
    this.setState({imageUrl: imageUrl.trim()});
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
        onClick={this.handleAddNote.bind(this)}
        />

    ];

    return (
      <Dialog
        title="New Note"
        actions={actions}
        modal={false}
        open={this.state.dialogOpen}
        onRequestClose={this.handleDialogClose.bind(this)}
        titleStyle={{fontWeight: 800, color: '#979797'}}
        >
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <TextField
            floatingLabelText="Name (Optional)"
            value={this.state.nameValue}
            onChange={this.handleNameChange.bind(this)}
            multiLine={true}
          />
          <TextField
            floatingLabelText="Message"
            style={{width:'70%'}}
            value={this.state.messageValue}
            onChange={this.handleMessageChange.bind(this)}
            errorText={this.state.messageError}
            multiLine={true}
          />
          <AddImage handleUrlChange={this.handleImageUrlChange.bind(this)}/>
          <AddLink handleUrlChange={this.handleUrlChange.bind(this)}/>

            <span style={{fontWeight: 600, fontSize: '1.2em', color: '#979797', paddingTop: 45, paddingBottom: 5}}>
              Mood
            </span>
            <span style={{color: '#979797'}}>
              Select how this note makes you feel.
            </span>

          <RadioButtonGroup
            style={{display:'flex', paddingTop: 5}}
            name="mood"
            defaultSelected="happy"
            valueSelected={this.state.moodState}
            onChange={this.handleMoodChange.bind(this)}
          >

            <RadioButton
              value="happy"
              checkedIcon={<HappyIcon/>}
              uncheckedIcon={<HappyIconBorder/>}
              iconStyle={{width:45, height:45}}
              style={{width: 'auto'}}
            />

            <RadioButton
              value="sad"
              checkedIcon={<SadIcon/>}
              uncheckedIcon={<SadIconBorder/>}
              iconStyle={{width:45, height:45}}
              style={{width: 'auto'}}
            />

          </RadioButtonGroup>
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

export default NoteDialog;
