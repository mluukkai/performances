import Link from 'next/link';

import { formatDate } from '@/app/lib/util';
import * as PerformanceRepository from '@/app/lib/dataAccess/performanceRepository';
import * as Artists from '@/app/lib/dataAccess/artistRepository';
import { addSingers } from '@/app/lib/actions';

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const performance = await PerformanceRepository.findOne(id);

  if (!performance) {
    return <div>Performance not found</div>;
  }

  const singers = (await Artists.findAll('singer')).map(({ name, firstname, fach, id }) => ({
    name: `${name} ${firstname} (${fach})`,
    id
  }));

  return (
    <div>
      <h3 className="text-3xl font-extrabold dark:text-white">
        Editing: {performance.work}, {performance.composer?.name}
      </h3>
      
      <div className="mt-3">
        {formatDate(performance.date)}
      </div>
      
      <div className="mt-3">
        {performance.venue?.name}
      </div>

      <div className="mt-3">
        Conducted by 
        <span className="pl-2">{performance.conductor?.firstname} {performance.conductor?.name}</span>
      </div>

      <h4 className="text-2xl font-extrabold dark:text-white mt-3">
        Orchestra {performance.orchestras.length > 1 ? 's' : ''}
      </h4>

      <div className="mt-3">
       {performance.orchestras.map(o => o.name).join(', ')}
      </div>

      <h4 className="text-2xl font-extrabold dark:text-white mt-3">
        Chorus{performance.orchestras.length > 1 ? 'es' : ''}
      </h4>

      <div className="mt-3">
        {performance.choruses.map(c => <p key={c.id}>{c.name}</p>)}
      </div>

      <h4 className="text-2xl font-extrabold dark:text-white mt-3">
        Solists
      </h4>

      <table className="table-fixed">
        <tbody>   
          {performance.solists.map((artist) => (
            <tr key={artist.id}>
              <td className="border px-4 py-2 w-64">
                <Link href={`/singers/${artist.id}`}>
                  <div className="text-blue-500">{artist.name}</div>
                </Link>
              </td>
              <td className="border px-4 py-2 w-40">
                {artist.firstname}
              </td>
              <td className="border px-4 py-2 w-24">
                {artist.fach}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="mt-10" action={addSingers}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="hidden"
            name="performance"
            value={id}
          />

          <label
            htmlFor="singers"
            className="w-32"
          >
            Singers
          </label>

          <select
            name="singers"
            className="border border-gray-300 p-2 m-2 w-64"
            multiple
          >
            {singers.map((artist) => (
              <option key={artist.id} value={artist.id}  disabled={artist.id === -1}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add singers
        </button>
      </form>

    </div>
  )
}