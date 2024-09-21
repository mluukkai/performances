/* eslint-disable @typescript-eslint/no-explicit-any */
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

export async function findOne(id: number) {
  const query = db
    .selectFrom('composers')
    .select(['id', 'name'])
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
      'venues.name as venue', 'works.name as work',
    ])
    .where('works.composer_id', '=', id)

  return await query.execute()
}

/*
  const table = 'composers'

  type foo = {
    table: any
    jointTable: any
  }

  const f = {
    table,
    jointTable: `${table}_performances`,

  } as unknown as foo
*/