import { createLazyFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
export const Route = createLazyFileRoute('/products')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    Hello "/products"! <br />
    <Link to="/product/1">Go to Product 1</Link> <br />
    <Link to="/product/2">Go to Product 2</Link> <br />
    <Link to="/product/3">Go to Product 3</Link> <br />
    <Link to="/product/4">Go to Product 4</Link> <br />
    <Link to="/product/5">Go to Product 5</Link>

  </div>
}
