import React from "react";
import Dropzone from 'react-dropzone';
import { FormGroup, ControlLabel, Col} from "react-bootstrap";

export default class Attachments extends React.Component {

  constructor() {
    super()
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  render() {

    const dropzoneStyle = {
      width  : "65%",
      height : "100px",
      border : "1px solid black",
      'border-width': "2px", 
      'border-color': "rgb(102, 102, 102)", 
      'border-style': "dashed",
      'border-radius': "5px"
    };

    return (
      <section>
        <FormGroup controlId="Attachments">
          <Col componentClass={ControlLabel} sm={3}>Attachments</Col>
          <Col sm={9}>
            <div className="dropzone">
              <Dropzone onDrop={this.onDrop.bind(this)} style={dropzoneStyle}>
                <p align="center">Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </div>
          </Col>
          <Col componentClass={ControlLabel} sm={3}>Dropped files</Col>
          <Col sm={9}>
            <aside>
              <ul>
              {
                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
              </ul>
            </aside>
          </Col>
        </FormGroup>
      </section>
    );
  }
}

/*
export default class Attachments extends React.Component {
  constructor() {
    super()
    this.state = {
      accept: '',
      files: [],
      dropzoneActive: false
    }
  }
  
  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }
  
  onDrop(files) {
    this.setState({
      files,
      dropzoneActive: false
    });
  }
  
  applyMimeTypes(event) {
    this.setState({
      accept: event.target.value
    });
  }
  
  render() {
    const { accept, files, dropzoneActive } = this.state;
    const overlayStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff'
    };

    return (
      <Dropzone
        disableClick
        style={{}}
        accept={accept}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
      { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }
      <div>
        <label htmlFor="mimetypes">Enter mime types you want to accept: </label>
        <input
            type="text"
            id="mimetypes"
            onChange={this.applyMimeTypes.bind(this)}
        />
        <h2>Dropped files</h2>
        <ul>
        {
          files.map(f => <li>{f.name} - {f.size} bytes</li>)
        }
        </ul>
      </div>
      </Dropzone>
    );
  }
}
*/
