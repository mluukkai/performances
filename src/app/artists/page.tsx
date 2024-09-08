//import * as ArtistRepository from '../lib/artistRepository';

export default async function Page() {
  const artists = [1,1]//await ArtistRepository.findArtists();

  return <p>Artists {artists.length}</p>;
}