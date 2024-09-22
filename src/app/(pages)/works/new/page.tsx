import { createWork } from '@/app/lib/actions';

import * as ComposersRepository from '@/app/lib/dataAccess/composerRepository';

export default async function Page() {

  const composers = (await ComposersRepository.findAll()).map((composer) => ({
    name: composer.name,
    id: composer.id,
  }));

  return (
    <div>
      <h3 className="text-4xl font-extrabold dark:text-white">
        New work
      </h3>

      <form className="mt-10" action={createWork}>
        <div className="grid grid-cols-2 gap-4">
          <label
            htmlFor="name"
            className="w-32"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border border-gray-300 p-2 m-2 w-64"
          />

          <label
            htmlFor="fach" className="w-32"
          >
            Composer
          </label>

          <select name="composer" className="border border-gray-300 p-2 m-2 w-64">
            {composers.map((composer) => (
              <option key={composer.id} value={composer.id}>
                {composer.name}
              </option>
            ))}
          </select>

        </div>

        <button type="submit" className="bg-blue-500 text-white pt-1 pb-1 pl-5 pr-5 m-2 rounded-md">Create</button>
      </form>

    </div>
  )
}