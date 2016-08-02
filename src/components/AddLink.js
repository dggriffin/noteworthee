//import styles from 'styles/Note.css';
import React from 'react';
import { FlatButton, TextField, IconButton } from 'material-ui';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import RemoveCircleIcon from 'material-ui/svg-icons/content/remove-circle';

class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlList: []
    };
  }

  renderUrlFields() {
    return this.state.urlList.map((url, index) => {
      return <div key={`${index}-url-field`} style={{display: 'flex', alignItems: 'center'}}>
        <TextField
          id={`${index}-url-field`}
          value={url}
          hintText="Enter URL"
          onChange={this.handleUrlChange.bind(this, index)}
        />
        <IconButton
          onClick={this.handleRemoveLink.bind(this, index)}>
          <RemoveCircleIcon color='grey'/>
        </IconButton>
        </div>
    });
  }

  handleUrlChange(index, event) {
    let urlList = [...this.state.urlList];
    urlList[index] = event.target.value;
    this.setState({urlList});
    this.props.handleUrlChange(urlList);
  }

  handleAddLink() {
    let urlList = [...this.state.urlList];
    urlList.push('');
    this.setState({urlList});
    this.props.handleUrlChange(urlList);
  }

  handleRemoveLink(index) {
    let urlList = [...this.state.urlList];
    urlList.splice(index, 1);
    this.setState({urlList});
    this.props.handleUrlChange(urlList);
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {this.renderUrlFields()}
        <span>
          <FlatButton
            label="Add Link"
            primary={true}
            onClick={this.handleAddLink.bind(this)}
            icon={<AddCircleIcon/>}
            />
        </span>
      </div>
    );
  }
}

export default AddLink;
