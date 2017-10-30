import React from "react";
import Dropzone from 'react-dropzone';
import { FormGroup, ControlLabel, Col, Checkbox} from "react-bootstrap";

export default class EditAttachments extends React.Component {

  constructor() {
    super()
    this.state = { 
      filesold: [
        {name: "Excel1.xlsx", size: "20154", error: "File has record Errors"},
        {name: "Excel2.xlsx", size: "25154", error: ""},
        {name: "Excel3.xlsx", size: "30154", error: ""},
      ],
      filesInstructionold: [
        {name: "Instruction.doc", size: "80154",},
      ],
      files: [], 
      filesInstruction: [],
      filefordata:[
        {name: "Excel1.xlsx", status: false,},
        {name: "Excel2.xlsx", status: false,},
        {name: "Excel3.xlsx", status: false,},
      ],
    }
  }

  showfile = (filename, mychecked) => {
    Object.keys(this.state.filefordata).map((k, index) => {
      if( this.state.filefordata[k]['name'] == filename ){
        this.state.filefordata[k]['status'] = mychecked;
      }
    });
    this.props.getDataToDisplay(this.state.filefordata);
  }

  onDrop(files) {
    this.setState({
      files
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
        <FormGroup controlId="instructions"  style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Instructions</Col>
          <Col sm={9}>
            <div className="dropzone">
              <Dropzone onDrop={this.onDropInstruction.bind(this)} style={dropzoneStyle} accept=".pdf, .docx, .doc">
                <p align="center">Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </div>
          </Col>
          <Col componentClass={ControlLabel} sm={3}>Attached Instruction files<br/>(Select the files you wish to Submit)</Col>
          <Col sm={9}>
            <aside>
              <ul>
              {
                this.state.filesInstructionold.map(f => <li key={f.name}><Checkbox inline label={f.name} onChange={ (e) => this.showfile( f.name, e.target.checked ) }>{f.name} - {f.size} bytes</Checkbox></li>)
              }
              {
                this.state.filesInstruction.map(f => <li key={f.name}><Checkbox inline label={f.name} checked disabled>{f.name} - {f.size} bytes</Checkbox></li>)
              }
              </ul>
            </aside>
          </Col>
        </FormGroup>
        <FormGroup controlId="EditAttachments"  style={{ 'margin-bottom': '10px' }}>
          <Col componentClass={ControlLabel} sm={3}>Files to process</Col>
          <Col sm={9}>
            <div className="dropzone">
              <Dropzone onDrop={this.onDrop.bind(this)} style={dropzoneStyle} accept=".xls, .xlsx">
                <p align="center">Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </div>
          </Col>
          <Col componentClass={ControlLabel} sm={3}>Attached files to process<br/>(Select the files you wish to Submit)</Col>
          <Col sm={9}>
            <aside>
              <ul>
              {
                this.state.filesold.map(f => {
                  if(f.error == '') {
                    return <li key={f.name}><Checkbox inline label={f.name} onChange={ (e) => this.showfile( f.name, e.target.checked ) }>{f.name} - {f.size} bytes</Checkbox></li>
                  } else {
                    return <li key={f.name} style={{ 'color': 'red' }}><Checkbox inline label={f.name} onChange={ (e) => this.showfile( f.name, e.target.checked ) }>{f.name} - {f.size} bytes, Error: {f.error}</Checkbox></li>
                  }
                })
              }
              {
                this.state.files.map(f => <li key={f.name}><Checkbox inline label={f.name} checked disabled>{f.name} - {f.size} bytes</Checkbox></li>)
              }
              </ul>
            </aside>
          </Col>
        </FormGroup>
      </section>
    );
  }
}


