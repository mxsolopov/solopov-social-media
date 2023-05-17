import Post from "../models/post.model"
import User from "../models/user.model"
import errorHandler from "./../helpers/dbErrorHandler"

const create = async (req, res) => {
  const post = new Post(req.body)
  try {
    await post.save()
    return res.status(200).json(post)
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
    res.status(200).json(posts)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const comment = async (req, res) => {
  try {
    const postId = req.body.postId
    const comment = req.body.comment

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true }
    )

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" })
    }

    res.status(200).json(updatedPost)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

export default {
  create,
  listNewsFeed,
  comment,
}
