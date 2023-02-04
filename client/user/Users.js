import React from "react"
import { Container, ListGroup, Button, Image } from "react-bootstrap"
import Layout from "../core/Layout"
import logo from "../assets/images/logo.svg"
import { list } from "./api-user.js"

const Users = () => {
  const [users, setUsers] = React.useState([])

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
          {users.map((item, i) => {
            return (
              <ListGroup.Item
                as="li"
                key={i}
                className="d-flex justify-content-between align-items-center"
              >
                <Image src={logo} rounded width="40px" height="40px" />
                <div className="ms-2 me-auto fw-bold">{item.name}</div>
                <Button variant="primary">See profile</Button>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </Container>
    </Layout>
  )
}

export default Users
