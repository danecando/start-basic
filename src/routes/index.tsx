import { createServerFn } from "@tanstack/react-start"

const helloWorld = createServerFn({ type: "static" }).handler(() => {
  return {
    message: "Hello World!!!",
  }
}
)

export const Route = createFileRoute({
  component: Home,
  loader: async () => await helloWorld(),
})

function Home() {
  const { message } = Route.useLoaderData()
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      {message}
    </div>
  )
}
