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