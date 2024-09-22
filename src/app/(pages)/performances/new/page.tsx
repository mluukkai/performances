import { createPerformance } from '@/app/lib/actions';

import * as Works from '@/app/lib/dataAccess/worksRepository';
import * as Venues from '@/app/lib/dataAccess/venueRepository';
import * as Artists from '@/app/lib/dataAccess/artistRepository';
import * as Orchestras from '@/app/lib/dataAccess/orchesterRepository';
import * as Chors from '@/app/lib/dataAccess/chorusRepository';

export default async function Page() {

  const works = [{ name: 'select work', id: -1 }].concat(
    (await Works.findAll()).map(({ name, id, composer }) => ({
      name: `${name } by ${composer}`,  id 
    }))
  );
  
  const conductors = [{ name: 'select conductor', id: -1 }].concat(
    (await  Artists.findAll('conductor')).map(({ name, id, firstname }) => ({
      name: `${name } ${firstname}`, id 
    }))
  );

  const venues = [{ name: 'select venue', id: -1 }].concat(
    (await Venues.findAll()).map(({ name, id }) => ({ name, id }))
  );

  const orchestras = (await Orchestras.findAll()).map(({ name, id }) => ({ name, id }));
  const chors = (await Chors.findAll()).map(({ name, id }) => ({ name, id }));
  const navichorus = chors.find(c => c.name === 'Navichorus')

  if (!navichorus) return null

  return (
    <div>
      <h3 className="text-4xl font-extrabold dark:text-white">
        New performance
      </h3>

      <form className="mt-10" action={createPerformance}>
        <div className="grid grid-cols-2 gap-4">
          <label
            htmlFor="date"
            className="w-32"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            placeholder="Name"
            className="border border-gray-300 p-2 m-2 w-64"
          />

          <label
            htmlFor="work"
            className="w-32"
          >
            Work
          </label>

          <select
            name="work"
            className="border border-gray-300 p-2 m-2 w-64"
            defaultValue={-1}
          >
            {works.map((work) => (
              <option key={work.id} value={work.id}  disabled={work.id === -1}>
                {work.name}
              </option>
            ))}
          </select>

          <label
            htmlFor="conductor"
            className="w-32"
          >
            Conductor
          </label>

          <select
            name="conductor"
            className="border border-gray-300 p-2 m-2 w-64"
            defaultValue={-1}
          >
            {conductors.map((conductor) => (
              <option key={conductor.id} value={conductor.id} disabled={conductor.id === -1}>
                {conductor.name}
              </option>
            ))}
          </select>

          <label
            htmlFor="venue"
            className="w-32"
          >
            Venue
          </label>

          <select
            name="venue"
            className="border border-gray-300 p-2 m-2 w-64"
            defaultValue={-1}
          >
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id} disabled={venue.id === -1}>
                {venue.name}
              </option>
            ))}
          </select>


          <label
            htmlFor="chors"
            className="w-32"
          >
            Chors
          </label>

          <select
            name="chors" multiple
            defaultValue={[ String(navichorus.id )]}
            className="border border-gray-300 p-2 m-2 w-64"
          >
            {chors.map((chor) => (
              <option key={chor.id} value={chor.id}>
                {chor.name}
              </option>
            ))}
          </select>

          <label
            htmlFor="orchestras"
            className="w-32"
          >
            Orchestras
          </label>

          <select name="orchestras" multiple className="border border-gray-300 p-2 m-2 w-64">
            {orchestras.map((orchestra) => (
              <option key={orchestra.id} value={orchestra.id}>
                {orchestra.name}
              </option>
            ))}
          </select>

        </div>

        <button type="submit" className="bg-blue-500 text-white pt-1 pb-1 pl-5 pr-5 m-2 rounded-md">
          Create
        </button>
      </form>

    </div>
  )
}