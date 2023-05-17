import express from "express"
import userCtrl from "../controllers/user.controller"
import authCtrl from "../controllers/auth.controller"
import postCtrl from "../controllers/post.controller"

const router = express.Router()

router
  .route("/api/posts/new/:userId")
  .post(authCtrl.requireSignin, postCtrl.create)

router
  .route("/api/posts/feed/:userId")
  .get(authCtrl.requireSignin, postCtrl.listNewsFeed)

router.route("/api/posts/comment").put(authCtrl.requireSignin, postCtrl.comment)

export default router
