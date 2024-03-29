import React from "react"
import PostList from "../post/PostList"
import auth from "../auth/auth-helper"
import { listNewsFeed } from "../post/api-post"

const PostsByUser = () => {
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
        setPosts(data.filter(post => post.postedBy._id === jwt.user._id))
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const addComment = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        const updatedComments = [...post.comments, comment]
        return { ...post, comments: updatedComments }
      }
      return post
    })
    setPosts(updatedPosts)
  }

  const updatePost = (postId, newData) => {
    setPosts(() => {
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return { ...post, ...newData };
        }
        return post;
      });
      return updatedPosts;
    });
  };

  return (
    <>
      <PostList posts={posts} addComment={addComment} updatePost={updatePost} />
    </>
  )
}

export default PostsByUser
