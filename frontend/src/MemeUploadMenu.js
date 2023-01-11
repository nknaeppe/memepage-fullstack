import { Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
const baseUrl = "http://localhost:4040";
const MemeUploadForm = () => {
  return <CollapseUploadUploadMenu />;
};
const CollapseUploadUploadMenu = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Upload Meme</Accordion.Header>
        <Accordion.Body>
          <UploadForm />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [title, setTitle] = useState("");

  const handleInputChangeFile = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChangeTitle = (event) => {
    setTitle(event.target.value);
    console.log(title);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(baseUrl + "/upload", formData, config).then((response) => {
      window.location.reload();
    });
  };
  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Meme Title</Form.Label>
        <Form.Control type="text" onChange={handleInputChangeTitle} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Control onChange={handleInputChangeFile} type="file" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
// const LoadingButton = () => {
//   const [isLoading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isLoading) {
//       // simulateNetworkRequest().then(() => {
//       //   setLoading(false);
//       // });
//     }
//   }, [isLoading]);

//   const handleClick = () => setLoading(true);

//   return (
//     <Button
//       variant="primary"
//       disabled={isLoading}
//       onClick={!isLoading ? handleClick : null}
//     >
//       {isLoading ? "Loading…" : "Upload"}
//     </Button>
//   );
// };
export default MemeUploadForm;
