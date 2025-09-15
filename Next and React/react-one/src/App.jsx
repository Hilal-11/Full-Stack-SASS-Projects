import React, { use, useEffect } from 'react'
import { useState } from 'react'
function App() {

  const [value , setValue] = useState("Hilal")

  // const changeFriend = async () => {
  //   const response = await fetch("http://localhost:3000/friend1")
  //   console.log(response)
  // }


  useEffect(() => {
    fetch('/api')
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setValue(data.name)
    })
    .catch((err) =>{
      setValue("Failed to get data")
      console.log(err)
    })
  }, [])

  
  return (
    <div>
        {/* <button onClick={changeFriend}>Change Friend</button> */}
        <h1>{value}</h1>
    </div>
  )
}

export default App