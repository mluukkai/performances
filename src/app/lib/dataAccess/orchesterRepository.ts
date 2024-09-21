import { db } from './database'

export async function findAll() {
  const query = db
    .selectFrom('orchestras')
    .leftJoin('orchestras_performances', 'orchestras.id', 'orchestras_performances.orchestra_id')
    .select([
      'orchestras.id',
      'orchestras.name',
      db.fn.count('orchestras_performances.orchestra_id').as('performance_count')
    ])
    .groupBy('orchestras.id')
    .orderBy('name')

  return await query.execute()
}

export async function findOne(id: number) {
  const query = db
    .selectFrom('orchestras')
    .select(['id', 'name'])
    .where('id', '=', id)

  return await query.executeTakeFirst()
}



export async function findPerformancesOf(id: number) {

  const query = db
    .selectFrom('orchestras')
    .leftJoin('orchestras_performances', 'orchestras.id', 'orchestras_performances.orchestra_id')
    .innerJoin('performances', 'performances.id', 'orchestras_performances.performance_id')
    .innerJoin('venues', 'venues.id', 'performances.venue_id')
    .innerJoin('works', 'works.id', 'performances.work_id')
    .innerJoin('composers', 'composers.id', 'works.composer_id')
    .select(['performances.date', 'performances.id',
      'venues.name as venue', 'works.name as work', 'composers.name as composer'
    ])
    .where('orchestras.id', '=', id)

  return await query.execute()
}