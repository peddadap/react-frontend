import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Col, Button, Modal} from "react-bootstrap";
import "../styles/StatusChange.css";

export default class StatusChange extends Component {

  constructor(statusdesc) {
    super();
    this.setState({ show: false });
    this.setState({ desc:  statusdesc});
  }

  getInitialState() {
    return { show: false };
  }

  render() {

    let close = () => this.setState({ show: false});

    return (
        <div className="modal-container" style={{height: 200}}>
          <Button
            bsStyle="warning"
            bsSize="small"
            onClick={() => this.setState({ show: true})}
            block
          >
          { this.state.desc }
          </Button>

          <Modal
            show={ this.state.show }
            onHide={close}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }
}
