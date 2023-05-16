import Post from "../models/post.model"
import User from "../models/user.model"
import errorHandler from "./../helpers/dbErrorHandler"

const create = async (req, res) => {
  const post = new Post(req.body)
  try {
    await post.save()
    return res.status(200).json({ message: "Successfully post added" })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const listNewsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("following")
      .exec()
    const following = user.following
    following.push(req.params.userId)
    let posts = await Post.find({ postedBy: { $in: following } })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .sort("-created")
      .exec()
    res.json(posts)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

export default {
  create,
  listNewsFeed,
}
