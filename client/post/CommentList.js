import React from "react"
import Comment from "./Comment"

const CommentList = ({ comments, formatDateToLocal }) => {
  return (
    <>
      <div>
        <h5>Комментарии</h5>
        {comments.map((comment, i) => {
          return <Comment key={i} comment={comment} formatDateToLocal={formatDateToLocal} />
        })}
      </div>
    </>
  )
}

export default CommentList
