/**
 * @version 0.1
 * @author wesen <wesen-ac@web.de>
 * @copyright 2019 wesen
 * @license MIT
 */

import { Button, Container, Row, Col, Table, Figure } from 'react-bootstrap';
import {DropzoneArea} from 'material-ui-dropzone';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
/*import Dropzone from 'react-dropzone';*/
import DropzoneComponent from 'react-dropzone-component';
import Dropzone from 'react-dropzone-uploader';
import { StyledDropZone } from 'react-drop-zone';

export default class MapUpload extends React.Component
{
    constructor(_props)
    {
        super(_props);

        this.state = {
            open: false,
            files: []
        };
    }

    handleClickOpen()
    {
        this.setState({
            open: true
        });
    }

    handleClose()
    {
        this.setState({
            open: false
        });
    }

    handleChange(files){
        this.setState({
            files: files
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
    }


    render()
    {
        var componentConfig = {
            iconFiletypes: ['.cgz', '.cfg'],
            showFiletypeIcon: true,
            postUrl: '/maps'
        };

        const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } };

        // called every time a file's `status` changes
        const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) };

        // receives array of files that are done uploading when submit button is clicked
        const handleSubmit = (files) => { console.log(files.map(f => f.meta)) };

        // TODO: Registered users can edit some details (e.g. screenshot, Creator, etc.)

        return <Container>
            <Row>
            <Col>
            <DropzoneArea
        onChange={this.handleChange.bind(this)}
        filesLimit={500000}
        dropzoneText='Drag and drop cgz/cfg files here or click to select them'

        acceptedFiles={['.cgz', '.cfg']}
        showPreviews={true}
        showPreviewsInDropzone={false}
        showFileNamesInPreview={true}
        onSave={this.handleSave.bind(this)}

            />
</Col>
            </Row>

            <Row>
            <Col>            <Button onClick={this.handleClose.bind(this)} variant="danger">
            Cancel
        </Button>
            </Col>
            <Col>
            <Button onClick={this.handleClose.bind(this)} variant="primary">
            Send
        </Button>
            </Col>
            </Row>

        /*
            <Row>

            <Dropzone
        disabled={false}
        noDrag={false}

              onDrop={acceptedFiles => console.log(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps({className: "dropzone"})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
            )}
        </Dropzone>

        </Row>
        */

            <Row>
            <DropzoneComponent config={componentConfig}
        eventHandlers={{}}
        djsConfig={{autoProcessQueue: false, addRemoveLinks: true}} />
        </Row>

            <Row>

            <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="*"
            />

        </Row>

            <Row>

            <StyledDropZone onDrop={(file, text) => console.log(file, text)} />

        </Row>

        </Container>;
    }
}


/*
  export default class DropzoneDialogExample extends React.Component {

  render() {
  return (
  <div>
  <Button onClick={this.handleOpen.bind(this)}>
  Add Image
  </Button>
  <DropzoneDialog
  open={this.state.open}
  onSave={this.handleSave.bind(this)}
  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
  showPreviews={true}
  maxFileSize={5000000}
  onClose={this.handleClose.bind(this)}
  />
  </div>
  );
  }
  }
*/
