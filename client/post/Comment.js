import React from "react"
import { Form, Button, Card } from "react-bootstrap"

const Comment = ({ comment, formatDateToLocal }) => {
  return (
    <Card className="mb-3">
      <Card.Header>
        <div style={{ fontSize: "14px" }}>{comment.postedBy.name}</div>
        <div style={{ fontSize: "12px" }} className="text-muted">
          {formatDateToLocal(comment.created)}
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>{comment.text}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Comment
