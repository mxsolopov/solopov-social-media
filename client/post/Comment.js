import React from "react"
import { Card, Image } from "react-bootstrap"
import { read } from "../user/api-user"
import auth from "../auth/auth-helper"

const Comment = ({ comment, formatDateToLocal }) => {
  const jwt = auth.isAuthenticated()
  const userId = jwt.user._id
  const [user, setUser] = React.useState({})

  React.useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    // Чтение данных для профиля пользователя
    read({ userId: comment.postedBy._id }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUser(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <Card className="mb-3">
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Image
            src={`/avatars/${user.avatar || "avatar-template-mx.png"}`}
            roundedCircle
            style={{
              width: "30px",
              height: "30px",
              objectFit: "cover",
            }}
          />
          <div>
            <div style={{ fontSize: "14px" }}>{comment.postedBy.name}</div>
            <div style={{ fontSize: "12px" }} className="text-muted">
              {formatDateToLocal(comment.created)}
            </div>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>{comment.text}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Comment
