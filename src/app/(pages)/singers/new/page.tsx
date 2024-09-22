import { createArtist } from '@/app/lib/actions';
import { fachs } from '@/app/lib/util';

export default async function Page() {

  return (
    <div>
      <h3 className="text-4xl font-extrabold dark:text-white">
        New singer
      </h3>

      <form className="mt-10" action={createArtist}>
        <div className="grid grid-cols-2 gap-4">
          <label
            htmlFor="last-name"
            className="w-32"
          >
            Last name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Last name"
            className="border border-gray-300 p-2 m-2 w-64"
          />

          <label htmlFor="first-name"  className="w-32">
            First name
          </label>
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            className="border border-gray-300 p-2 m-2 w-64"
          />

          <label
            htmlFor="fach" className="w-32"
          >
            Fach
          </label>

          <select name="fach" className="border border-gray-300 p-2 m-2 w-64">
            {fachs.map((fach) => (
              <option key={fach} value={fach}>
                {fach}
              </option>
            ))}
          </select>

        </div>

        <button type="submit" className="bg-blue-500 text-white pt-1 pb-1 pl-5 pr-5 m-2 rounded-md">
          Save
        </button>
      </form>

    </div>
  )
}