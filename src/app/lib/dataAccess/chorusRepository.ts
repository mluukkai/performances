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