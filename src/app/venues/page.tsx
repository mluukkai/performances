
import Link from 'next/link';
import * as VenueRepository from '../lib/venueRepository';

export default async function Page() {
  const venues = await VenueRepository.findVenues()

  return (
    <div>
    <h2>Venues</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">kaupunki</th>
            <th className="px-4 py-2">osoite</th>
            <th className="px-4 py-2">maa</th>
          </tr>
        </thead>
        <tbody>
          
          {venues.map((venue) => (
            <tr key={venue.id}>
              <td className="border px-4 py-2">
                <Link href={`/artists/${venue.id}`}>
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