
import Link from 'next/link';

import * as Venues from '@/app/lib/dataAccess/venueRepository';

export default async function Page() {
  const venues = await Venues.findAll()

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Venues</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Street</th>
            <th className="px-4 py-2">Country</th>
          </tr>
        </thead>
        <tbody>
          
          {venues.map((venue) => (
            <tr key={venue.id}>
              <td className="border px-4 py-2">
                <Link href={`/venues/${venue.id}`}>
                  <div className="text-blue-500">{venue.name}</div>
                </Link>
              </td>
              <td className="border px-4 py-2">
                {venue.city}
              </td>
              <td className="border px-4 py-2">
                {venue.street}
              </td>
              <td className="border px-4 py-2">
                {venue.country}
              </td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}