import { db } from './database'

export async function findAll() {
  const query = db
    .selectFrom('chors')
    .leftJoin('chors_performances', 'chors.id', 'chors_performances.chor_id')
    .select([
      'chors.id',
      'chors.name',
      db.fn.count('chors_performances.chor_id').as('performance_count')
    ])
    .groupBy('chors.id')
    .orderBy('name')

  return await query.execute()
}

export async function findOne(id: number) {
  const query = db
    .selectFrom('chors')
    .select(['id', 'name'])
    .where('id', '=', id)

  return await query.executeTakeFirst()
}

export async function findPerformancesOf(id: number) {
  const query = db
    .selectFrom('chors')
    .innerJoin('chors_performances', 'chors.id', 'chors_performances.chor_id')
    .innerJoin('performances', 'performances.id', 'chors_performances.performance_id')
    .innerJoin('venues', 'venues.id', 'performances.venue_id')
    .innerJoin('works', 'works.id', 'performances.work_id')
    .innerJoin('composers', 'composers.id', 'works.composer_id')
    .select(['performances.date', 'performances.id',
      'venues.name as venue', 'works.name as work', 'composers.name as composer'
    ])
    .where('chors.id', '=', id)

  return await query.execute()
}