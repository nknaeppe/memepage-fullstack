import { useState } from "react";
import { ToggleButton } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function MemeCard(props) {
  const { fileID, id, likes, title, uploadDate } = props.props;
  const [checked, setChecked] = useState(false);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src={props.fileUrl} />

      <Card.Body>
        <ToggleButton
          className="mb-2"
          id="toggle-check"
          type="checkbox"
          variant="primary"
          checked={checked}
          onChange={(e) => setChecked(e.currentTarget.checked)}
        >
          Like
        </ToggleButton>

        <Card.Subtitle className="mb-2 text-muted">
          {likes === 1 ? likes + " Like" : likes + " Likes"}
        </Card.Subtitle>
      </Card.Body>
      <Card.Body>
        <Card.Text>Comments</Card.Text>
      </Card.Body>

      <Card.Footer className="text-muted">posted on {uploadDate}</Card.Footer>
    </Card>
  );
}

export default MemeCard;
