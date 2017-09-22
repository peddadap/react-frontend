import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
var ReactDOMServer = require('react-dom/server');

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            autoProcessQueue: false,
            previewTemplate: ReactDOMServer.renderToStaticMarkup(
                <div className="dz-preview dz-file-preview">
                  <div className="dz-details">
                    <div className="dz-filename"><span data-dz-name="true"></span></div>
                    <img data-dz-thumbnail="true" />
                  </div>
                  <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
                  <div className="dz-success-mark"><span>✔</span></div>
                  <div className="dz-error-mark"><span>✘</span></div>
                  <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
                </div>
              )
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/uploadHandler'
        };

        this.dropzone = null;
    }

    handleFileAdded(file) {
        console.log(file);
    }

    handlePost() {
        this.dropzone.processQueue();
    }

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            addedfile: this.handleFileAdded.bind(this)
        }
        const  style = {
             'border': 'dotted 2px black;'
        } 

        return (
           <section>
            < div className="dropzone">
                    <br/>
                    <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
                </div>
            </section>
        );
    }
}