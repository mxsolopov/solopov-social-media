import path from "path"
import express from "express"
import mongoose from "mongoose"
import template from "./../template"
import config from "./../config/config"
import app from "./express"
// comment out before building for production
import devBundle from "./devBundle"

//comment out before building for production
devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd()
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")))

app.get("/", (req, res) => {
  res.status(200).send(template())
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info("Server started on port %s.", config.port)
})

// Database Connection URL
mongoose.Promise = global.Promise
mongoose.set("strictQuery", false)
mongoose.connect(config.mongoUri, {})
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})
