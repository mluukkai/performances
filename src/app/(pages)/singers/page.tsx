import Link from 'next/link';
import { auth } from "@/auth"

import * as Artists from '@/app/lib/dataAccess/artistRepository';

export default async function Page() {
  const artists = await Artists.findAll('singer');

  const session = await auth()

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Singers
      </h2>
      
      { session?.user &&
        <div className="mt-5 mb-5">      
          <a 
            href="/singers/new"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Create a new
          </a>
        </div>
      }

      <table className="table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2">Last name</th>
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