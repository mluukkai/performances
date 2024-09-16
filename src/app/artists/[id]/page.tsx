import * as ArtistRepository from '../../lib/dataAccess/artistRepository';
import * as PerformanceRepository from '../../lib/dataAccess/performanceRepository';

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const artist = await ArtistRepository.findOne(id);

  if(!artist) {
    return <div>Artistia ei löytynyt</div>
  }

  const performances = await PerformanceRepository.findPerformancesOfArtst(id);

  console.log(performances);

  return (
    <div>
      <h2>{artist.firstname} {artist.name}</h2>

      <div>{artist.fach}</div>

      <h3>Esitykset</h3>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Teos</th>
            <th className="px-4 py-2">Säveltäjä</th>
            <th className="px-4 py-2">Paikka</th>
            <th className="px-4 py-2">Päivämäärä</th>
          </tr>
        </thead>
        <tbody>
          {performances.map((performance) => (
            <tr key={performance.id}>
              <td className="border px-4 py-2">{performance.work}</td>
              <td className="border px-4 py-2">{performance.composer}</td>
              <td className="border px-4 py-2">{performance.venue}</td>
              <td className="border px-4 py-2">{performance.date.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}