//import styles from 'styles/Note.css';
import React from 'react';
import { FlatButton, TextField, IconButton } from 'material-ui';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import RemoveCircleIcon from 'material-ui/svg-icons/content/remove-circle';

class AddImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlList: [],
      errorText: ''
    };
  }

  renderUrlFields() {
    return this.state.urlList.map((url, index) => {
      return <div key={`${index}-url-field`} style={{display: 'flex', alignItems: 'center'}}>
        <TextField
          id={`${index}-url-field`}
          value={url}
          style={{width: '70%'}}
          hintText="Enter Image URL"
          errorText={this.state.errorText}
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
    if(/\.(jpe?g|png|gif|bmp)$/i.test(event.target.value))
    {
      this.props.handleUrlChange(event.target.value);
      this.setState({errorText: ''})
    }
    else {
      this.setState({errorText: 'Must be a valid image url ending in .jp(e)g, .png, .gif, .bmp'})
    }

  }

  handleAddLink() {
    let urlList = [...this.state.urlList];
    urlList.push('');
    this.setState({urlList});
    this.props.handleUrlChange('');
  }

  handleRemoveLink(index) {
    let urlList = [...this.state.urlList];
    urlList.splice(index, 1);
    this.setState({urlList, errorText: ''});
    this.props.handleUrlChange(urlList);
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {this.renderUrlFields()}
        <span>
          {
            this.state.urlList.length ? <div></div> :
            <FlatButton
              label="Add Image Link"
              primary={true}
              onClick={this.handleAddLink.bind(this)}
              icon={<AddCircleIcon/>}
            />
          }

        </span>
      </div>
    );
  }
}

export default AddImage;
