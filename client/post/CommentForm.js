import React from "react"
import { Form, Button } from "react-bootstrap"
import auth from "../auth/auth-helper"
import { comment } from "./api-post"

const CommentForm = ({ postId, addComment}) => {
  const [value, setValue] = React.useState({
    text: "",
    error: "",
    user: {},
  })

  const jwt = auth.isAuthenticated()
  React.useEffect(() => {
    setValue({ ...value, user: auth.isAuthenticated().user })
  }, [])
  const clickComment = (event) => {
    event.preventDefault()
    const commentData = {
      text: value.text,
      postedBy: value.user,
      created: Date.now(),
    }
    comment(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      postId,
      commentData
    ).then((data) => {
      if (data.error) {
        setValue({ ...value, error: data.error })
      } else {
        addComment(postId, commentData)
        setValue({ ...value, text: "" })
      }
    })
  }
  return (
    <Form onSubmit={clickComment}>
      <Form.Group controlId="formComment">
        <Form.Label>Добавить комментарий</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={value.text}
          onChange={(event) => setValue({ ...value, text: event.target.value })}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Отправить
      </Button>
    </Form>
  )
}

export default CommentForm
