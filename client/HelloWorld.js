import React from "react"

const HelloWorld = () => {
  const [value, setValue] = React.useState("")
  return (
    <div>
      <h1>Hello, World!</h1>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

export default HelloWorld
