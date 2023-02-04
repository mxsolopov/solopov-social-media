import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./core/Home"
import Signup from "./user/Signup"
import Users from "./user/Users"
import Signin from "./auth/Signin"


const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/users" element={<Users/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
    </Routes>
  )
}

export default MainRouter
