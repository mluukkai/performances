import { db } from './database'

export async function findAll() {
  const query = db
    .selectFrom('works')
    .leftJoin('composers', 'composers.id', 'works.composer_id')
    .leftJoin('performances', 'works.id', 'performances.work_id')
    .select([
      'works.id',
      'works.name',
      'composers.name as composer',
      db.fn.count('performances.id').as('performance_count')
    ])
    .groupBy(['works.id' ,'composers.name'])
    .orderBy(['composer', 'works.name'])

  return await query.execute()
}

export async function findOne(id: number) {
  const query = db
    .selectFrom('works')
    .leftJoin('composers', 'composers.id', 'works.composer_id')
    .select(['works.id', 'works.name', 'composers.name as composer'])
    .where('works.id', '=', id)

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
      'venues.name as venue', 'works.name as work',
    ])
    .where('performances.work_id', '=', id)

  return await query.execute()
}

export async function create(name: string, composer_id: number, composername: string) {
  const result = await db
    .insertInto('works')
    .values({
      name, composer_id, composername,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()  
    })
    .executeTakeFirst()

  return result.insertId
}
