import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import Layout from "./Layout"
import PostForm from "../post/PostForm"
import PostList from "../post/PostList"

const App = () => {
  return (
    <Layout>
      <Container>
        <PostForm />
        <PostList />
      </Container>
    </Layout>
  )
}
export default App
