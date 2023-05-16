import React from "react"
import { Form, Button } from "react-bootstrap"
import auth from "./../auth/auth-helper"
import { create } from "./api-post.js"

const PostForm = ({ addPost }) => {
  const [values, setValues] = React.useState({
    title: "",
    text: "",
    error: "",
    user: {},
  })

  const jwt = auth.isAuthenticated()
  React.useEffect(() => {
    setValues({ ...values, user: auth.isAuthenticated().user })
  }, [])
  const clickPost = (event) => {
    event.preventDefault()
    const postData = {
      title: values.title,
      text: values.text,
      postedBy: values.user,
      created: Date.now(),
    }
    create(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      postData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        addPost(postData)
        setValues({ ...values, title: "", text: "" })
        // props.addUpdate(data)
      }
    })
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  return (
    <>
      <h1 className="mb-3">Новый пост</h1>
      <Form onSubmit={clickPost} className="mb-5">
        <Form.Group controlId="formTitle">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            type="text"
            value={values.title}
            onChange={handleChange("title")}
          />
        </Form.Group>
        <Form.Group controlId="formContent" className="mt-3">
          <Form.Label>Содержание</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={values.text}
            onChange={handleChange("text")}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={values.text === ""}
          className="mt-3"
        >
          Отправить
        </Button>
      </Form>
    </>
  )
}

export default PostForm
