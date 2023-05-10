import React from "react"
import { Container, ListGroup, Button, Image } from "react-bootstrap"
import { ArrowRight } from "phosphor-react"
import Layout from "../core/Layout"
import { list } from "./api-user.js"
import { useNavigate } from "react-router"

const Users = () => {
  const [users, setUsers] = React.useState([])
  const navigate = useNavigate()

  React.useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUsers(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <Layout>
      <Container fluid="xl">
        <ListGroup as="ol">
          {users.map((user, i) => {
            return (
              <ListGroup.Item
                as="li"
                key={i}
                className="d-flex justify-content-between align-items-center"
              >
                <Image
                  src={`/avatars/${user.avatar}`}
                  rounded
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                  }}
                />
                <div className="ms-2 me-auto fw-bold">{user.name}</div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => console.log("Подписаться")}
                >
                  Подписаться
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="mx-2"
                  onClick={() => navigate("/user/" + user._id)}
                >
                  <ArrowRight size={16} />
                </Button>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </Container>
    </Layout>
  )
}

export default Users
