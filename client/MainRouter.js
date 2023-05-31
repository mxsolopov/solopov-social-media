import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./core/Home"
import Newsfeed from "./core/Home"
import Signup from "./user/Signup"
import Users from "./user/Users"
import Signin from "./auth/Signin"
import Profile from "./user/Profile"
import ProtectedRoute from "./ProtectedRoute"

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/user/:userId"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default MainRouter
