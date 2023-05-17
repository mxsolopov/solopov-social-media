import mongoose from "mongoose"
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
  },
  text: {
    type: String,
    required: "Text is required",
  },
  // photo: {
  //   data: Buffer,
  //   contentType: String,
  // },
  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  comments: [
    {
      text: {
        type: String,
      },
      created: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    },
  ],
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("Post", PostSchema)
