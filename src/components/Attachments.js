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
        <FormGroup controlId="Attachments"  style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Attachments</Col>
          <Col sm={9}>
            <div className="dropzone">
              <Dropzone onDrop={this.onDrop.bind(this)} style={dropzoneStyle} accept=".pdf, .xls, .xlsx, .docx, .doc">
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


