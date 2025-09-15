import React, { Fragment, use, useEffect , Profiler , Suspense } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import Loading from './components/Loading'
function App() {

  const [value , setValue] = useState("Hilal")

  // const changeFriend = async () => {
  //   const response = await fetch("http://localhost:3000/friend1")
  //   console.log(response)
  // }


  // useEffect(() => {
  //   fetch('/api')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data)
  //     setValue(data.name)
  //   })
  //   .catch((err) =>{
  //     setValue("Failed to get data")
  //     console.log(err)
  //   })
  // }, []) 

  const inputRef = useRef(null);
  const handleFocus = () => {
    inputRef.current.focus();
  }

  const [currentValue , setCurrentValue] = useState(0)
  const ref = useRef(0)
  const handleClick = () => {
    ref.current = ref.current+1;
    setCurrentValue(ref.current)
    
  }
  const handleReset = () => {
    ref.current = 0;
    setCurrentValue(ref.current)
  }


  const onRender = (id , phase , actualDuration, baseDuration , startTime , commintTime) => {
    console.log(id , phase , actualDuration, baseDuration , startTime , commintTime)
  }
  
  return (
      <Suspense fallback={<Loading/>}>
          <Fragment>
          {/* <button onClick={changeFriend}>Change Friend</button> */}
          {/* <h1>{value}</h1> */}
        <Profiler id='Hilal' onRender={onRender}>
            <div>
              <button onClick={ handleClick }>Click Me</button>
              <h2>Buttn is clicked { currentValue } times</h2>
              <button onClick={handleReset}>Reset it</button>
            </div>
          </Profiler>

          {/* <div>
            <img src="https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?cs=srgb&dl=pexels-flickr-145939.jpg&fm=jpg" alt="" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRd4tMV6HaIWxr7wFwZXe0zwPcii09Na1sIBoduwLrafiDgYyKzasMSyxNSAPLbfb87Q0&usqp=CAU" alt="" />
            <img src="https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?cs=srgb&dl=pexels-pixabay-460672.jpg&fm=jpg" alt="" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKkG8iRPOXlvTzMS-20NYtMq4wt2ynRiuCAj3L2fQk5yXjVLvKetUaBqiZ-28mdfcRWsA&usqp=CAU" alt="" />
          </div> */}

        </Fragment>
      </Suspense>
  )
}

export default App