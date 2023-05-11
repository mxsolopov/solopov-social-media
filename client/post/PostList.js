import React from "react"
import { Card, Button, Form } from "react-bootstrap"
import Post from "./Post"

const PostList = () => {
  return (
    <div>
      <h2 className="mb-3">Опубликованные посты</h2>
      {[1, 2, 3].map((_, i) => {
        return <Post />
      })}
    </div>
  )
}

export default PostList
