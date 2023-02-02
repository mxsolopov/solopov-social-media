import React from "react"
import {
  Container,
  Nav,
  Navbar,
  Button,
  Stack,
  Row,
  Col,
  Card,
} from "react-bootstrap"
import logo from "../assets/images/logo.svg"
import template from "../assets/images/template.png"

const App = () => {
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" className="sticky-top">
        <Container fluid="xl">
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Solopov Space
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Stack direction="horizontal" gap={3}>
              <Button variant="outline-light">Users</Button>{" "}
              <Button variant="secondary">Sign up</Button>{" "}
              <Button variant="primary">Sign in</Button>{" "}
            </Stack>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section className="my-5">
        <Container fluid="xl">
          <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col key={idx}>
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
      </section>
      <footer className="bg-light text-center text-lg-start">
        <div className="text-center p-3">
          © 2023 Copyright: Solopov Social Network
        </div>
      </footer>
    </>
  )
}
export default App
