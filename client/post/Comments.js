import React from "react"
import { Form, Button, Card } from "react-bootstrap"

const Comments = () => {
  const [showReplyForm, setShowReplyForm] = React.useState(false)

  return (
    <>
      <div>
        <h5>Комментарии</h5>
        <Card>
          <Card.Body>
            <Card.Title>Имя</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">date</Card.Subtitle>
            <Card.Text>Комментарий</Card.Text>
            <Button variant="primary">👍</Button>{" "}
            <Button variant="secondary">👎</Button>{" "}
            <Button onClick={() => setShowReplyForm(!showReplyForm)}>
              Ответить
            </Button>
            {showReplyForm && (
              <Form className="mt-3">
                <Form.Group controlId="reply">
                  <Form.Label>Ответить</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Отправить
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default Comments
