import React from "react"
import { Card, Button, Form } from "react-bootstrap"
import Comments from "./Comments"
import { ThumbsDown, ThumbsUp } from "phosphor-react"

const Post = ({ post }) => {
  const formatDateToLocal = (dateString) => {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")

    return `${day}.${month}.${year} ${hours}:${minutes}`
  }

  return (
    <Card className="mb-4">
      <Card.Header>
        <div style={{ fontSize: "14px" }}>{post.postedBy.name}</div>
        <div style={{ fontSize: "12px" }} className="text-muted">
          {formatDateToLocal(post.created)}
        </div>
      </Card.Header>
      <Card.Body>
        <h3 style={{ fontSize: "18px", fontWeight: 500 }}>{post.title}</h3>
        <Card.Text>{post.text}</Card.Text>
        <Button variant="outline-success">
          <ThumbsUp size={16} style={{ transform: "translateY(-2px)" }} />
        </Button>{" "}
        <Button variant="outline-danger">
          <ThumbsDown size={16} style={{ transform: "translateY(-2px)" }} />
        </Button>
        <hr />
        <Comments />
      </Card.Body>
      <Card.Footer>
        <Form>
          <Form.Group controlId="formComment">
            <Form.Label>Добавить комментарий</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              // value={1}
              // onChange={console.log(1)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Отправить
          </Button>
        </Form>
      </Card.Footer>
    </Card>
  )
}

export default Post
