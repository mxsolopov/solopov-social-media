import React from "react"
import { Card, Button, Form } from "react-bootstrap"
import CommentList from "./CommentList"
import { ThumbsDown, ThumbsUp } from "phosphor-react"
import CommentForm from "./CommentForm"
import { like, removelike, dislike, removedislike } from "./api-post"
import auth from "../auth/auth-helper"

const Post = ({ post, postId, addComment }) => {
  const jwt = auth.isAuthenticated()

  const [values, setValues] = React.useState({
    like: post.likes.includes(jwt.user._id) ? true : false,
    likes: post.likes.length,
    dislike: post.dislikes.includes(jwt.user._id) ? true : false,
    dislikes: post.dislikes.length,
  })

  const formatDateToLocal = (dateString) => {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")

    return `${day}.${month}.${year} ${hours}:${minutes}`
  }

  const upRate = () => {
    let callApi = values.like ? removelike : like
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      postId
    ).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setValues({ ...values, like: !values.like, likes: data.likes.length })
        values.dislike &&
          removedislike(
            {
              userId: jwt.user._id,
            },
            {
              t: jwt.token,
            },
            postId
          ).then((data) => {
            if (data.error) {
              console.log(data.error)
            } else {
              setValues({
                like: true,
                likes: data.likes.length,
                dislike: false,
                dislikes: data.dislikes.length,
              })
            }
          })
      }
    })
  }

  const downRate = () => {
    let callApi = values.dislike ? removedislike : dislike
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      postId
    ).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setValues({
          ...values,
          dislike: !values.dislike,
          dislikes: data.dislikes.length,
        })
        values.like &&
          removelike(
            {
              userId: jwt.user._id,
            },
            {
              t: jwt.token,
            },
            postId
          ).then((data) => {
            if (data.error) {
              console.log(data.error)
            } else {
              setValues({
                like: false,
                likes: data.likes.length,
                dislike: true,
                dislikes: data.dislikes.length,
              })
            }
          })
      }
    })
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
        <Button
          variant={values.like ? "success" : "outline-success"}
          onClick={upRate}
        >
          {values.likes > 0 ? values.likes + " " : ""}
          <ThumbsUp size={16} style={{ transform: "translateY(-2px)" }} />
        </Button>{" "}
        <Button
          variant={values.dislike ? "danger" : "outline-danger"}
          onClick={downRate}
        >
          {values.dislikes > 0 ? values.dislikes + " " : ""}
          <ThumbsDown size={16} style={{ transform: "translateY(-2px)" }} />
        </Button>
        <hr />
        <CommentList
          comments={post.comments}
          formatDateToLocal={formatDateToLocal}
        />
      </Card.Body>
      <Card.Footer>
        <CommentForm postId={postId} addComment={addComment} />
      </Card.Footer>
    </Card>
  )
}

export default Post
