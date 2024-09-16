import { db } from './database'

export async function findAll() {
  const query = db.selectFrom('artists').selectAll()

  return await query.execute()
}

export async function findOne(id: number) {
  const query = db
    .selectFrom('artists')
    .select(['id', 'name', 'firstname', 'fach'])
    .where('id', '=', id)

  return await query.executeTakeFirst()
}