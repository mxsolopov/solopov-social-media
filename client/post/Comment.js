import React from "react"
import { Card, Image } from "react-bootstrap"
import { read } from "../user/api-user"
import auth from "../auth/auth-helper"

const Comment = ({ comment, formatDateToLocal }) => {

  return (
    <Card className="mb-3">
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Image
            src={`/avatars/${comment.postedBy.avatar}`}
            roundedCircle
            style={{
              width: "30px",
              height: "30px",
              objectFit: "cover",
            }}
          />
          <div>
            <div style={{ fontSize: "14px" }}>{comment.postedBy.name}</div>
            <div style={{ fontSize: "12px" }} className="text-muted">
              {formatDateToLocal(comment.created)}
            </div>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>{comment.text}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Comment
