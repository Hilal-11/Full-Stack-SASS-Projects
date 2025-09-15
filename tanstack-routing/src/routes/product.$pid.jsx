import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/$pid')({
  component: RouteComponent,
})

function RouteComponent() {
  const { pid } = Route.useParams()
  return <div>This is my Product {pid}</div>
}
