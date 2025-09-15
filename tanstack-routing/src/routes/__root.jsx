import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div>
        <Link to="/">Home</Link>{" "}
        <Link to="/about">About</Link>{" "}
        <Link to="/projects">Projects</Link>{" "}
        <Link to="/pricing">Pricing</Link>{" "}
        <Link to="/contect">Contect</Link>{" "}
      </div>
      <Outlet />
    </React.Fragment>
  )
}
