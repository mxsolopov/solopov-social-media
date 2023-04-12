import path from "path"
import express from "express"
import mongoose from "mongoose"
import config from "./../config/config"
import app from "./express"
// comment out before building for production
import devBundle from "./devBundle"

//comment out before building for production
devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd()
// app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")))
app.use(express.static(path.join(CURRENT_WORKING_DIR, "server/static")))
console.log(path.join(CURRENT_WORKING_DIR, "server/static"))

app.get("/*", (req, res) => {
  res.status(200).type("html").send(html)
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

const html = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solopov Social Network</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <div id="root"></div>
    <script src="/dist/bundle.js"></script>
  </body>
</html>`
