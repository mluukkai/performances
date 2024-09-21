import Link from 'next/link';

import { formatDate } from '@/app/lib/util';
import * as PerformanceRepository from '../../../lib/dataAccess/performanceRepository';

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const performance = await PerformanceRepository.findOne(id);

  if (!performance) {
    return <div>Performance not found</div>;
  }

  return (
    <div>
      <h3 className="text-3xl font-extrabold dark:text-white">
        {performance.work}, {performance.composer?.name}
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
                <Link href={`/artists/${artist.id}`}>
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
    </div>
  )
}