import Link from 'next/link';

import * as ArtistRepository from '../../lib/dataAccess/artistRepository';

export default async function Page() {
  const artists = await ArtistRepository.findAll('singer');

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Singers
      </h2>
      
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2 ">Last name</th>
            <th className="px-4 py-2">First name</th>
            <th className="px-4 py-2">Fach</th>
            <th className="px-4 py-2">Performances</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.id}>
              <td className="border px-4 py-2 w-64">
                <Link href={`/singers/${artist.id}`}>
                  <div className="text-blue-500">{artist.name}</div>
                </Link>
              </td>
              <td className="border px-4 py-2 w-64">
                {artist.firstname}
              </td>
              <td className="border px-4 py-2 w-16">
                {artist.fach}
              </td>
              <td className="border px-4 py-2 w-16">
                {artist.performance_count}
              </td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}