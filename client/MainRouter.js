import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./core/Home"

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
  )
}

export default MainRouter
