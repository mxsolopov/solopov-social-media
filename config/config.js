const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "mxsolopov",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb+srv://mxsolopov:UCDtYU60jv9t65Kt@cluster0.l0v0ehu.mongodb.net/?retryWrites=true&w=majority",
}

export default config
