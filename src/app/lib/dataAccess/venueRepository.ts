import { db } from './database'

export async function findVenues() {
  const query = db.selectFrom('venues')

  return await query.selectAll().execute()
}

export async function findOne(id: number) {
  const query = db
    .selectFrom('venues')
    .select(['id', 'name', 'street','city', 'country'])
    .where('id', '=', id)

  return await query.executeTakeFirst()
}

export async function findPerformancesOf(id: number) {
  const query = db
    .selectFrom('performances')
    .innerJoin('venues', 'venues.id', 'performances.venue_id')
    .innerJoin('works', 'works.id', 'performances.work_id')
    .innerJoin('composers', 'composers.id', 'works.composer_id')
    .select([
      'performances.date', 'performances.id', 'performances.date',
      'composers.name as composer', 'works.name as work',
    ])
    .where('performances.venue_id', '=', id)

  return await query.execute()
}