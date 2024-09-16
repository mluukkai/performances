import { db } from './database'

export async function findAll() {
  const query = db
    .selectFrom('performances')
    .leftJoin('works', 'works.id', 'performances.work_id')
    .leftJoin('composers', 'composers.id', 'works.composer_id')
    .leftJoin('artists', 'artists.id', 'performances.artist_id')
    .select([
      'performances.id', 'performances.date', 'works.name as work', 
      'composers.name as composer', 'artists.name as conductor'
    ])

  return await query.execute()
}

export async function findPerformancesOfArtst(id: number) {
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

  console.log(query.compile())

  return await query.execute()
}