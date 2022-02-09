import React, { Fragment, useState } from 'react'

import { Form } from 'react-bootstrap';
import axios from 'axios';

import AlertMessage from '../common/AlertMessage';
import Progress from '../Progress/Progress';

const FileUploader = () => {
  // STATE: For our uploader, we need: the file + the file name
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  
  // We send back an object from our server with file name + path
  const [uploadedFile, setUploadedFile] = useState({});

  // Dynamic Alert Message States
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMesageVariant, setAlertMesageVariant ] = useState('info');

  // Dynamic Upload Percentage
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name); 
    console.log(file);
  }

  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      // 3 Params: Endpoint, Form Data & Axios Options
      const response = await axios.post(
        '/api/auth/avatar', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },

          onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(Math.round(
                ( progressEvent.loaded * 100) / progressEvent.total )
              )
            )
            // Clear Progress Percentage
            setTimeout(() => setUploadPercentage(0), 10000);
          }
        }
      );
      // Destructure the data object we send back from the server
      const { fileName, filePath } = response.data;

      // Set our uploaded file state with the object data from server
      setUploadedFile({ fileName, filePath });

      setAlertMessage('File Uploaded Successfully');
      setAlertMesageVariant('success');

    } catch(err) {
      console.log(err.response.data);

      if(err.response.status === 500) {
        setAlertMessage('There was a problem with the server')
        setAlertMesageVariant('danger');
      } else {
        setAlertMessage(err.response.data);
        setAlertMesageVariant('danger');
      }
    }
  }

  return (
    <Fragment>
      
      { alertMessage ? <AlertMessage msg={alertMessage} variant={alertMesageVariant} /> : null }

      <Form onSubmit={onSubmit}>
        <Form.File 
          id="customFile"
          type="file"
          label={fileName}
          className="mb-4"
          onChange={onChange}
          custom
        />

        <Progress percentage={uploadPercentage} />

        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
      </Form>

{/* Image preview */}
      { uploadedFile ? <div className="row mt-4 mb-4">
        <div className="col-md-6 m-auto">
          <h3 className="text-center">{ uploadedFile.fileName }</h3>
          <img style={{ width: '50%' }} src={ uploadedFile.filePath } alt="" />
        </div>
      </div> : null}
    </Fragment>
  )
}

export default FileUploader
