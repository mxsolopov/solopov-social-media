import React from "react"
import { Buffer } from "buffer"
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Modal,
} from "react-bootstrap"
import auth from "../auth/auth-helper"
import { read, update, remove } from "./api-user"
import { useNavigate } from "react-router"
import { useParams } from "react-router-dom"
import Layout from "../core/Layout"
import avatar from "../assets/images/avatar.png"
import { Trash, PencilSimple, FloppyDisk } from "phosphor-react"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

const Profile = () => {
  const { userId } = useParams()
  const [user, setUser] = React.useState({})
  const [redirectToSignin, setRedirectToSignin] = React.useState(false)
  const navigate = useNavigate()
  // Состояние редактирования полей профиля
  const [edit, setEdit] = React.useState(false)
  // Поля профиля
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [about, setAbout] = React.useState("")
  // Состояние модалки удаления профиля
  const [deleteModal, setDeleteModal] = React.useState(false)
  // Токен и данные пользователя
  const jwt = auth.isAuthenticated()
  // Файл аватарки
  const [file, setFile] = React.useState(null)
  const [savedAvatar, setSavedAvatar] = React.useState(null)

  const isAuthenticated =
    auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id

  // Обновление данных в профиле
  React.useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
        setName(data.name)
        setEmail(data.email)
        setAbout(data.about)
        setPassword("")
        // setSavedAvatar(
        //   new Blob(data.photo.data, { type: 'image/jpeg' })
        // )
        // console.log(new Blob(data.photo.data, { type: 'image/jpeg' }))
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [userId, edit])

  if (redirectToSignin) navigate("/signin")

  // Удаление профиля
  const deleteAccount = () => {
    remove(
      {
        userId: userId,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        auth.clearJWT(() => console.log("deleted"))
        navigate("/")
      }
    })
  }

  // Обработчик редактирования полей
  const editSubmit = () => {
    const user = {
      name: name || undefined,
      email: email || undefined,
      password: password || undefined,
      about: about || undefined,
    }
    update(
      {
        userId: userId,
      },
      {
        t: jwt.token,
      },
      user
    ).then((data) => {
      setUser(data)
      setPassword("")
      setEdit(false)
    })
  }

  // Обработчик загрузки аватарки
  const handleFileSelect = (event) => {
    setFile(event.target.files[0])
  }

  // Сохранение аватарки в базу данных
  const saveFileToBase = (fileData) => {
    const buffer = new Buffer.from(fileData)
    const user = {
      name: name || undefined,
      email: email || undefined,
      password: password || undefined,
      about: about || undefined,
      avatar: buffer || undefined,
    }
    update(
      {
        userId: userId,
      },
      {
        t: jwt.token,
      },
      user
    ).then((data) => {
      console.log(data)
    })
  }

  // Обработчик формы загрузки аватара
  const handleSubmit = (event) => {
    event.preventDefault()

    const reader = new FileReader()
    reader.onload = () => {
      const fileData = new Uint8Array(reader.result)
      saveFileToBase(fileData)
    }
    reader.readAsArrayBuffer(file)
  }

  // Тултип для аватара
  const renderTooltip = (props) => (
    <Tooltip id="avatar-tooltip" {...props}>
      {file ? "Change photo" : "Upload your photo"}
    </Tooltip>
  )

  return (
    <>
      <Layout>
        <Container fluid="xl">
          <Row xs={1} md={2} className="g-4">
            <Col xl={4}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="profile-photo">
                  <Form.Label style={{ cursor: "pointer" }}>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 0, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <Image
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : savedAvatar
                            ? savedAvatar
                            : avatar
                        }
                        alt="Avatar"
                        roundedCircle
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </OverlayTrigger>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileSelect}
                    className="d-none"
                  />
                </Form.Group>
              </Form>
              <div className="d-flex">
                <div className="mt-2 me-1">{user.name}</div>
              </div>
              <div className="mt-1 text-muted">
                {new Date(
                  user.updated ? user.updated : user.created
                ).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
              {isAuthenticated && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="mt-2"
                  onClick={() => setDeleteModal(true)}
                >
                  <Trash size={16} /> Удалить аккаунт
                </Button>
              )}
            </Col>
            <Col xl={8}>
              <Row>
                <Col xl={6}>
                  {edit ? (
                    <Form.Control
                      placeholder="Имя"
                      type="text"
                      className="mb-3"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    <div className="mb-3">
                      <div className="text-muted">Имя</div>
                      <div className="mt-1">{user.name}</div>
                    </div>
                  )}
                </Col>
                <Col xl={6}>
                  {edit ? (
                    <Form.Control
                      placeholder="Email"
                      type="email"
                      className="mb-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  ) : (
                    <div className="mb-3">
                      <div className="text-muted">Email</div>
                      <div className="mt-1">{user.email}</div>
                    </div>
                  )}
                </Col>
              </Row>
              {isAuthenticated && (
                <Row>
                  <Col xl={6}>
                    {edit ? (
                      <Form.Control
                        placeholder="Новый пароль"
                        type="password"
                        className="mb-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    ) : (
                      <div className="mb-3">
                        <div className="text-muted">Пароль</div>
                        <div className="mt-1">**********</div>
                      </div>
                    )}
                  </Col>
                </Row>
              )}
              <Row>
                <Col>
                  {edit ? (
                    <Form.Control
                      as="textarea"
                      placeholder="Кратко о себе"
                      className="mb-3"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  ) : (
                    <div className="mb-3">
                      <div className="text-muted">О себе</div>
                      <div className="mt-1">{user.about}</div>
                    </div>
                  )}
                </Col>
              </Row>
              <hr />
              {isAuthenticated && (
                <Button
                  variant="outline-primary"
                  size="md"
                  className="float-end"
                  onClick={() => {
                    setEdit(true)
                    if (edit) {
                      editSubmit()
                    }
                  }}
                >
                  <span className="d-inline-block me-1">
                    {edit ? (
                      <FloppyDisk size={16} />
                    ) : (
                      <PencilSimple size={16} />
                    )}
                  </span>
                  {edit ? "Сохранить" : "Редактировать"}
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </Layout>
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить аккаунт</Modal.Title>
        </Modal.Header>
        <Modal.Body>Подтвердите удаление аккаунта</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={() => deleteAccount()}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Profile
