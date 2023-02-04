import React from "react"
import {
  Container,
  Navbar,
  Button,
  Stack,
} from "react-bootstrap"
import logo from "../assets/images/logo.svg"
import { useNavigate } from "react-router-dom";

const Layout = ({children}) => {

  const navigate = useNavigate()

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" className="sticky-top mb-5">
        <Container fluid="xl">
          <Navbar.Brand role="button" onClick={() => navigate("/")}>
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
              <Button variant="outline-light" onClick={() => navigate("/users")}>Users</Button>{" "}
              <Button variant="primary" onClick={() => navigate("/signin")}>Sign in</Button>{" "}
              <Button variant="secondary" onClick={() => navigate("/signup")}>Sign up</Button>{" "}
            </Stack>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
      <footer className="bg-light text-center text-lg-start mt-5">
        <div className="text-center p-3">
          © 2023 Copyright: Solopov Social Network
        </div>
      </footer>
    </>
  )
}
export default Layout
