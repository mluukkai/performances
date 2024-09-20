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

export async function findPerformancesOf(id: number) {
  const query = db
    .selectFrom('artists')
    .innerJoin('artists_performances', 'artists.id', 'artists_performances.artist_id')
    .innerJoin('performances', 'performances.id', 'artists_performances.performance_id')
    .innerJoin('venues', 'venues.id', 'performances.venue_id')
    .innerJoin('works', 'works.id', 'performances.work_id')
    .innerJoin('composers', 'composers.id', 'works.composer_id')
    .select(['performances.date', 'performances.id',
      'venues.name as venue', 'works.name as work', 'composers.name as composer'
    ])
    .where('artists.id', '=', id)

  return await query.execute()
}