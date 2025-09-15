import React from 'react'

function Loading() {
  return (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
            alignItems: 'center'
        }}
    >
        <h1 style={{
            fontSize: '20rem',
            fontWeight: 'bold'
        }}>Loading...</h1>
    </div>
  )
}

export default Loading