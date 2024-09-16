import { db } from './database'

export async function findPerformances() {
  const query = db.selectFrom('performances')

  return await query.selectAll().execute()
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