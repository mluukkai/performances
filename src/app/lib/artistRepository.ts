import { db } from './database'
//import { Artist } from './types'

export async function findArtists() {
  const query = db.selectFrom('users')

  console.log('JEE')

  const stuff = await query.selectAll().execute()
  console.log('stuff', stuff) 

  return stuff
}