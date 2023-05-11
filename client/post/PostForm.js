import React from "react"
import { Form, Button } from "react-bootstrap"

const PostForm = () => {
  return (
    <>
      <h1 className="mb-3">Новый пост</h1>
      <Form onSubmit={console.log(1)} className="mb-5">
        <Form.Group controlId="formTitle">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            type="text"
            value={1}
            //   onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formContent" className="mt-3">
          <Form.Label>Содержание</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={1}
            //   onChange={(event) => setContent(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Отправить
        </Button>
      </Form>
    </>
  )
}

export default PostForm
