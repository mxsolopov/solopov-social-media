import React from "react"
import Post from "./Post"

const PostList = ({ posts, addComment }) => {
  return (
    <div>
      <h2 className="mb-3">Опубликованные посты</h2>
      {posts.map((post, i) => {
        return <Post key={i} post={post} postId={post._id} addComment={addComment} />
      })}
    </div>
  )
}

export default PostList
