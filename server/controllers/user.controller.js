import User from "../models/user.model"
import extend from "lodash/extend"
import errorHandler from "./../helpers/dbErrorHandler"
import fs from "fs"
import path from "path"

const create = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    return res.status(200).json({ message: "Successfully signed up" })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}
const list = async (req, res) => {
  try {
    const users = await User.find().select(
      "name email updated avatar created followers following"
    )
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
      .populate("following", "_id name")
      .populate("followers", "_id name")

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      })
    }
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user",
    })
  }
}
const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}
const update = async (req, res) => {
  try {
    let user = req.profile
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}
const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await user.remove()
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const removeAvatar = async (req, res) => {
  const { filename } = req.params
  const CURRENT_WORKING_DIR = process.cwd()
  const filePath = path.join(
    CURRENT_WORKING_DIR,
    `server/static/avatars/${filename}`
  )

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Avatar does not exist:", err)
      res.status(404).json({ error: "Avatar does not exist" })
    } else {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Failed to delete avatar:", err)
          res.status(500).json({ error: "Failed to delete avatar" })
        } else {
          res.status(200).json({ message: "Avatar deleted" })
        }
      })
    }
  })
}

const addFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { following: req.body.followId },
    })
    next()
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const addFollower = async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.body.userId } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec()
    result.hashed_password = undefined
    result.salt = undefined
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const removeFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $pull: { following: req.body.unfollowId },
    })
    next()
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}
const removeFollower = async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      req.body.unfollowId,
      { $pull: { followers: req.body.userId } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec()
    result.hashed_password = undefined
    result.salt = undefined
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

export default {
  create,
  userByID,
  read,
  list,
  remove,
  update,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  removeAvatar,
}
