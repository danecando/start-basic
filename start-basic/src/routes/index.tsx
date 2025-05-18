import { createServerFn } from '@tanstack/react-start'

const helloWorld = createServerFn({ type: 'static' }).handler(() => {
  return {
    message: 'Hello world!',
  }
});

export const Route = createFileRoute({
  component: Home,
  loader: async () => {
    const { message } = await helloWorld();
    return {
      message,
    };
  }
})

function Home() {
  const { message } = Route.useLoaderData();
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <p>{message}</p>
    </div>
  )
}
