import React from "react"
import { Card, Button, Form } from "react-bootstrap"
import Comments from "./Comments"

const Post = () => {
  return (
    <Card className="mb-4">
      <Card.Header>
        {/* <img src={post.author.avatar} alt={post.author.name} /> */}
        Maksim Solopov
      </Card.Header>
      <Card.Body>
        <Card.Text>Контент</Card.Text>
        <Button variant="primary" onClick={console.log(1)}>
          👍
        </Button>{" "}
        <Button variant="primary" onClick={console.log(-1)}>
          👎
        </Button>
        <hr/>
        <Comments />
      </Card.Body>
      <Card.Footer>
        <Form onSubmit={console.log(1)}>
          <Form.Group controlId="formComment">
            <Form.Label>Добавить комментарий</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={1}
              onChange={console.log(1)}
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
