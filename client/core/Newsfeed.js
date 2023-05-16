import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import Layout from "./Layout"
import Feed from "../post/Feed"

const App = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col lg={8}>
            <Feed />
          </Col>
          <Col lg={4}>Сайдбар</Col>
        </Row>
      </Container>
    </Layout>
  )
}
export default App
