import Performances from '@/app/components/Performances';
import * as ArtistRepository from '../../../lib/dataAccess/artistRepository';

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const artist = await ArtistRepository.findOne(id);

  if(!artist) {
    return <div>Artistia ei löytynyt</div>
  }

  const performances = await ArtistRepository.findPerformancesOf(id);

  return (
    <div>
      <h2 className="text-3xl font-extrabold dark:text-white">
        {artist.firstname} {artist.name}
      </h2>

      <div>{artist.fach}</div>

      <Performances performances={performances} />
    </div>
  );
}