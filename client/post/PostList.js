import React from "react"
import Post from "./Post"

const PostList = ({ posts }) => {
  return (
    <div>
      <h2 className="mb-3">Опубликованные посты</h2>
      {posts.map((post, i) => {
        return <Post key={i} post={post} />
      })}
    </div>
  )
}

export default PostList
