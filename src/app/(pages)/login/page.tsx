import { authenticate } from "@/app/lib/actions";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';


export default async function Page() {
  const session = await auth()

  if (session?.user) {
    redirect('/')
  }

  return (
    <div>
      <h3 className="text-4xl font-extrabold dark:text-white">
        Login
      </h3>

      <form className="mt-10" action={authenticate}>
        <div className="grid grid-cols-2 gap-2">
      
          <label htmlFor="username" className="w-16">
            Username
          </label>
          <input
            className="border border-gray-300 p-2 m-2 w-64"
            type="text"
            id="username"
            name="username"
            required
          />

          <label htmlFor="password" className="w-16">
            Password
          </label>
          <input
            className="border border-gray-300 p-2 m-2 w-64"
            type="password"
            id="password"
            name="password"
            required
          />

        </div>
        <button className="bg-blue-500 text-white pt-1 pb-1 pl-5 pr-5 m-2 rounded-md" type="submit">Login</button>
      </form>

    </div>
  )
}