import * as ArtistRepository from '../../lib/artistRepository';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const artists = await ArtistRepository.findArtists();

  const artist = artists.find((artist) => artist.id === parseInt(id, 10));

  console.log(artist);

  if(!artist) {
    return <div>Artistia ei löytynyt</div>
  }

  return (
    <div>
    <h2>{artist.firstname} {artist.name}</h2>

    <div>{artist.fach}</div>

    </div>
  );
}