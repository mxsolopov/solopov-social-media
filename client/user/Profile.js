import React from "react"
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
import { Trash, PencilSimple, FloppyDisk } from "phosphor-react"
import FollowProfileButton from "./FollowProfileButton"

const Profile = () => {
  const { userId } = useParams()
  const [user, setUser] = React.useState({})
  const [following, setFollowing] = React.useState(false)
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
  const [avatar, setAvatar] = React.useState(null)
  const [avatarFileName, setAvatarFileName] = React.useState("")

  const isAuthenticated =
    auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id

  // Проверка подписки на пользователя
  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id == jwt.user._id
    })
    return match
  }

  // Обновление данных в профиле
  React.useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        let following = checkFollow(data)
        setFollowing(following)
        setUser(data)
        setName(data.name)
        setEmail(data.email)
        setAbout(data.about)
        setAvatarFileName(data.avatar)
        setPassword("")
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [userId, edit])

  if (redirectToSignin) navigate("/signin")

  const clickFollowButton = (callApi) => {
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      user._id
    ).then((data) => {
      if (data.error) {
      } else {
        setFollowing(!following)
      }
    })
  }

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

  // Сохраняем выбранный файл аватарки в состоянии компонента
  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault() // Отменяем стандартное поведение отправки формы

    const formData = new FormData() // Создаем объект FormData для передачи данных формы
    formData.append("avatar", avatar) // Добавляем файл аватарки в объект FormData

    try {
      const response = await fetch(`/api/avatar/${userId}`, {
        // Отправляем PUT-запрос на сервер с указанием id пользователя
        method: "PUT",
        body: formData, // Передаем объект FormData с данными формы
      })

      if (response.ok) {
        // Если ответ сервера успешный (статус 200-299)
        const data = await response.json() // Парсим JSON-ответ
        setAvatarFileName(data.avatarFileName)
        setAvatar(null)
        console.log("Success:", data)
      } else {
        throw new Error("Ошибка при загрузке аватарки") // Генерируем ошибку в случае неуспешного ответа сервера
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <>
      <Layout>
        <Container fluid="xl">
          <Row xs={1} md={2} className="g-4">
            <Col xl={4}>
              {isAuthenticated ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="profile-photo">
                    <Form.Label style={{ cursor: "pointer" }}>
                      <Image
                        src={
                          avatar
                            ? URL.createObjectURL(avatar)
                            : `/avatars/${avatarFileName}`
                        }
                        alt="Avatar"
                        roundedCircle
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleAvatarChange}
                      className="d-none"
                    />
                  </Form.Group>
                  {avatar && <Button type="submit">Загрузить</Button>}
                </Form>
              ) : (
                <Image
                  src={
                    avatar
                      ? URL.createObjectURL(avatar)
                      : `/avatars/${avatarFileName}`
                  }
                  alt="Avatar"
                  roundedCircle
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}

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
              {auth.isAuthenticated().user &&
              auth.isAuthenticated().user._id == user._id ? (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="mt-2"
                  onClick={() => setDeleteModal(true)}
                >
                  <Trash size={16} /> Удалить аккаунт
                </Button>
              ) : (
                <FollowProfileButton
                  following={following}
                  onButtonClick={clickFollowButton}
                />
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
