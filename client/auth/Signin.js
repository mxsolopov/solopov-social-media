import React from "react"
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Image,
  Modal,
} from "react-bootstrap"
import Layout from "../core/Layout"
import template from "../assets/images/template.png"
import { useNavigate } from "react-router"
import auth from "./../auth/auth-helper"
import { signin } from "./api-auth.js"

const Signin = (props) => {
  const navigate = useNavigate()

  const initValues = {
    password: "",
    email: "",
    error: "",
  }

  const [values, setValues] = React.useState(initValues)

  const clickSubmit = (event) => {
    event.preventDefault()
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "" })
        })
        setValues(initValues)
        navigate("/")
      }
    })
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  return (
    <>
      <Layout>
        <Container>
          <Row xs={1} md={2} className="align-items-center">
            <Col>
              <Image src={template} className="w-100" />
            </Col>
            <Col>
              <h1 className="mb-4 text-center mt-4 mt-md-0">Sign in</h1>
              <Form className="px-0 px-md-5">
                <Form.Group className="mb-3" controlId="signUpEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={handleChange("email")}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signUpPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleChange("password")}
                  />
                </Form.Group>
                <Form.Text className="text-danger d-block mb-3">
                  {values.error}
                </Form.Text>
                <Button variant="primary" type="submit" onClick={clickSubmit}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  )
}

export default Signin
