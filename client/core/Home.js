import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import template from "../assets/images/template.png"
import Layout from "./Layout"

const App = () => {
  return (
    <Layout>
        <Container fluid="xl">
          <Row className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col xs={12} md={6} key={idx}>
                <Card>
                  <Card.Img variant="top" src={template} />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
    </Layout>
  )
}
export default App
