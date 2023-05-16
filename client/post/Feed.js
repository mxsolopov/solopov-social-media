import React from "react"
import PostForm from "./PostForm"
import PostList from "./PostList"
import auth from "../auth/auth-helper"
import { listNewsFeed } from "./api-post"

const Feed = () => {
  const [posts, setPosts] = React.useState([])
  const jwt = auth.isAuthenticated()

  React.useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listNewsFeed(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      signal
    ).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setPosts(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const addPost = (post) => {
    const updatedPosts = [...posts]
    updatedPosts.unshift(post)
    setPosts(updatedPosts)
  }

  return (
    <>
      <PostForm addPost={addPost} />
      <PostList posts={posts} />
    </>
  )
}

export default Feed
