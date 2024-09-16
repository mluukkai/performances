import { db } from './database'

export async function findAll() {
  const query = db
    .selectFrom('composers')
    .leftJoin('works', 'composers.id', 'works.composer_id')
    .leftJoin('performances', 'works.id', 'performances.work_id')
    .select([
      'composers.id',
      'composers.name',
      db.fn.count('performances.id').as('performance_count')
    ])
    .groupBy('composers.id')
    .orderBy('name')

  return await query.execute()
}