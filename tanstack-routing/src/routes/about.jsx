import { createFileRoute } from '@tanstack/react-router'
import { useContext } from 'react'
import { AppContext } from '../Context/UserContext'
export const Route = createFileRoute('/about')({
  component: RouteComponent,
  defaultPreload: 'intent',
})

function RouteComponent() {

  const { loading, setLoading } = useContext(AppContext)
  
  return <div>{loading && <div>Hello World</div>}</div>
}
