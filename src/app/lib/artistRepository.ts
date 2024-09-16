import { db } from './database'
//import { Artist } from './types'

export async function findArtists() {
  const query = db.selectFrom('artists')

  const stuff = await query.selectAll().execute()

  return stuff
}