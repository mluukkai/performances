import { db } from './database'

export async function findAll() {
  const query = db
    .selectFrom('artists')
    .leftJoin('artists_performances', 'artists.id', 'artists_performances.artist_id')
    .select([
      'artists.id',
      'artists.name',
      'artists.firstname',
      'artists.fach',
      db.fn.count('artists_performances.artist_id').as('performance_count')
    ])
    .groupBy('artists.id')
    .orderBy('name')

  return await query.execute()
}

export async function findOne(id: number) {
  const query = db
    .selectFrom('artists')
    .select(['id', 'name', 'firstname', 'fach'])
    .where('id', '=', id)

  return await query.executeTakeFirst()
}