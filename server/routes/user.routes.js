import express from "express"
import userCtrl from "../controllers/user.controller"
import authCtrl from "../controllers/auth.controller"
import multer from "multer"
import config from "../../config/config"
import User from "../models/user.model"

const router = express.Router()

router.route("/api/users").get(userCtrl.list).post(userCtrl.create)

/* Загрузка аватарки */

// Создаем хранилище для сохранения загруженных аватарок
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.staticPath + "\\avatars") // Указываем папку на сервере, где будут сохраняться аватарки
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname) // Генерируем уникальное имя файла, чтобы избежать конфликтов и перезаписи файлов
  },
})

// Создаем middleware для загрузки аватарок
const upload = multer({ storage: storage })

router
  .route("/api/avatar/:userId")
  .put(upload.single("avatar"), async (req, res) => {
    // Обрабатываем загрузку аватарки, например, сохраняем имя файла в базу данных и возвращаем ответ
    const avatarFileName = req.file.filename // Имя загруженного файла аватарки
    const userId = req.params.userId
    // Сохраняем имя файла в базу данных
    try {
      await User.findOneAndUpdate(
        { _id: userId }, // Условие поиска пользователя по его id
        { avatar: avatarFileName, updated: Date.now() } // Имя файла аватарки для обновления
      )
      res
        .status(201)
        .json({ success: true, avatarFileName: avatarFileName, id: userId })
    } catch (err) {
      return res.status(400).json({
        error: err,
      })
    }
  })

  router
  .route("/api/avatar/:filename")
  .delete(authCtrl.requireSignin, userCtrl.removeAvatar)

router
  .route("/api/users/follow")
  .put(authCtrl.requireSignin, userCtrl.addFollowing, userCtrl.addFollower)

router
  .route("/api/users/unfollow")
  .put(
    authCtrl.requireSignin,
    userCtrl.removeFollowing,
    userCtrl.removeFollower
  )

router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param("userId", userCtrl.userByID)

export default router
