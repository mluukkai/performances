
import Link from 'next/link';
import * as ArtistRepository from '../lib/artistRepository';

export default async function Page() {
  const artists = await ArtistRepository.findArtists();

  return (
    <div>
    <h2>Artistit</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Sukunimi</th>
            <th className="px-4 py-2">Etunimi</th>
            <th className="px-4 py-2">Fakki</th>
          </tr>
        </thead>
        <tbody>
          
          {artists.map((artist) => (
            <tr key={artist.id}>
              <td className="border px-4 py-2">
                <Link href={`/artists/${artist.id}`}>
                  <div className="text-blue-500">{artist.name}</div>
                </Link>
              </td>
              <td className="border px-4 py-2">
                {artist.firstname}
              </td>
              <td className="border px-4 py-2">
                {artist.fach}
              </td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}