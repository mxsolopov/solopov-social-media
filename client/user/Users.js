import React from "react"
import { Container, ListGroup, Button, Image } from "react-bootstrap"
import Layout from "../core/Layout"
import { list } from "./api-user.js"
import UserListItem from "./UserListItem"
import auth from "../auth/auth-helper"

const Users = () => {
  const [users, setUsers] = React.useState([])
  // id авторизованного пользователя
  const id = auth.isAuthenticated().user._id

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
        <h1>Пользователи</h1>
        <ListGroup as="ol" className="mt-4">
          {users.filter(user => user._id !== id).map((user, i) => {
            return <UserListItem key={i} user={user} iterator={i} />
          })}
        </ListGroup>
      </Container>
    </Layout>
  )
}

export default Users
