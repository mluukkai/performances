import { db } from './database'

export async function findVenues() {
  const query = db.selectFrom('venues')

  return await query.selectAll().execute()
}