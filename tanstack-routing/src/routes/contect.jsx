import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contect')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloremque, tempora sunt quis minima porro voluptate laborum, maxime dolorum assumenda sequi eveniet voluptatem explicabo consequuntur earum ut id, blanditiis quaerat. Cumque quos id minus repudiandae vero dolorem dolores quis quasi consequatur veniam voluptatem labore impedit explicabo dolorum at, officiis qui, accusantium architecto velit eligendi esse earum quaerat rerum ducimus. Odit nam enim necessitatibus, numquam nihil, aperiam sint repudiandae debitis suscipit reiciendis qui quam fuga! Optio praesentium sunt saepe incidunt ut, tenetur delectus aperiam, architecto deleniti, quaerat dolorem fuga molestias id facere eveniet repellendus ullam pariatur error soluta. Ducimus, itaque dolore.</p></div>
}
