import React from "react";
import Dropzone from 'react-dropzone';
import { FormGroup, ControlLabel, Col, Checkbox} from "react-bootstrap";

export default class Attachments extends React.Component {

  constructor() {
    super()
    this.state = { 
      filesInstruction: [],
      filesToProcess: [], 
    }
  }

  onDropToProcess(filesToProcess) {
    this.setState({
      filesToProcess
    });
  }

  onDropInstruction(filesInstruction) {
    this.setState({
      filesInstruction
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
        <FormGroup controlId="process"  style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Files to process</Col>
          <Col sm={9}>
            <div className="dropzone">
              <Dropzone onDrop={this.onDropToProcess.bind(this)} style={dropzoneStyle} accept=".xls, .xlsx">
                <p align="center">Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </div>
          </Col>
          <Col componentClass={ControlLabel} sm={3}>Dropped files</Col>
          <Col sm={9}>
            <aside>
              <ul>
              {
                this.state.filesToProcess.map(f => <li key={f.name}><Checkbox inline label={f.name} checked disabled>{f.name} - {f.size} bytes</Checkbox></li>)
              }
              </ul>
            </aside>
          </Col>
        </FormGroup>
        <FormGroup controlId="instructions"  style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Instructions</Col>
          <Col sm={9}>
            <div className="dropzone">
              <Dropzone onDrop={this.onDropInstruction.bind(this)} style={dropzoneStyle} accept=".pdf, .docx, .doc">
                <p align="center">Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </div>
          </Col>
          <Col componentClass={ControlLabel} sm={3}>Dropped files</Col>
          <Col sm={9}>
            <aside>
              <ul>
              {
                this.state.filesInstruction.map(f => <li key={f.name}><Checkbox inline label={f.name} checked disabled>{f.name} - {f.size} bytes</Checkbox></li>)
              }
              </ul>
            </aside>
          </Col>
        </FormGroup>
      </section>
    );
  }
}


