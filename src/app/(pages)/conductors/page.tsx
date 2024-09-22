import Link from 'next/link';

import * as Artists from '@/app/lib/dataAccess/artistRepository';

export default async function Page() {
  const artists = await Artists.findAll('conductor');

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Conductors</h2>
      
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2 w-64">Lastname</th>
            <th className="px-4 py-2 w-32">Firstname</th>
            <th className="px-4 py-2 w-16">Performances</th>
          </tr>
        </thead>
        <tbody>
          
          {artists.map((artist) => (
            <tr key={artist.id}>
              <td className="border px-4 py-2 w-64">
                <Link href={`/conductors/${artist.id}`}>
                  <div className="text-blue-500">{artist.name}</div>
                </Link>
              </td>
              <td className="border px-4 py-2 w-64">
                {artist.firstname}
              </td>
              <td className="border px-4 py-2 w-32">
                {artist.performance_count}
              </td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}