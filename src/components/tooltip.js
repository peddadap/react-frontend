import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { OverlayTrigger, Tooltip} from "react-bootstrap";

export default class LinkWithTooltip extends Component {
    render() {
        let tooltip = <Tooltip id={this.props.id}>{this.props.tooltip}</Tooltip>;
        return (
            <OverlayTrigger
                overlay={tooltip} placement="top"
                delayShow={300} delayHide={150}
            >
                <a href={this.props.href}>{this.props.children}</a>
            </OverlayTrigger>
        );
    }
};