import { Container, Row, Col } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditText.css";
import { useState } from "react";

export const EditText = () => {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }], // custom button values

      [{ font: [] }],
      [{ size: [] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],

      ["bold", "italic", "underline", "strike"], // toggled buttons
      // ["blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { script: "sub" },
        { script: "super" },
      ],
      ["link", "image", "video"],

      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ];

  return (
    <>
      <Container className="editText-container mt-3">
        <form>
          <Row>
            <Col md="6" className="editText-editor ">
              <ReactQuill
                theme="snow"
                value={value}
                onChange={(value) => setValue(value)}
                modules={modules}
                formats={formats}
              />
            </Col>

            <Col md="6" className="editText-preview ">
              <h1>Hello</h1>
              <div dangerouslySetInnerHTML={{ __html: value }} />
              <p>{value}</p>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  );
};
