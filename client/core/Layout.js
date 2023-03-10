import React from "react"
import { Container, Navbar, Button, Stack } from "react-bootstrap"
import logo from "../assets/images/logo.svg"
import { useNavigate } from "react-router-dom"
import auth from "../auth/auth-helper"

const Layout = ({ children }) => {
  const isAuthenticated = auth.isAuthenticated()
  const navigate = useNavigate()
  const headerRef = React.useRef(null)
  const footerRef = React.useRef(null)
  const [contentMinHeight, setContentMinHeight] = React.useState(0)
  React.useEffect(() => {
    setContentMinHeight(
      window.innerHeight -
        headerRef.current.offsetHeight -
        footerRef.current.offsetHeight
    )
  }, [])

  return (
    <>
      <Navbar
        bg="dark"
        expand="lg"
        variant="dark"
        className="sticky-top"
        ref={headerRef}
      >
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
            <Stack direction="horizontal" gap={3} className="mt-3 mt-sm-0">
              <Button
                variant="outline-light"
                onClick={() => navigate("/users")}
              >
                Пользователи
              </Button>{" "}
              {isAuthenticated ? (
                <>
                  <Button
                    variant="primary"
                    onClick={() =>
                      navigate(`/user/${isAuthenticated.user._id}`)
                    }
                  >
                    Профиль
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      auth.clearJWT(() => navigate("/"))
                    }}
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" onClick={() => navigate("/signin")}>
                    Войти
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/signup")}
                  >
                    Регистрация
                  </Button>{" "}
                </>
              )}
            </Stack>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="py-5" style={{ minHeight: contentMinHeight + "px" }}>
        {children}
      </main>
      <footer className="bg-light text-center text-lg-start" ref={footerRef}>
        <div className="text-center p-3">
          © 2023 Все права защищены: Solopov Social Network
        </div>
      </footer>
    </>
  )
}
export default Layout
