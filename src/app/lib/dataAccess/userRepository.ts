import { db } from './database'

export async function findOne(username: string) {
  const query = db
    .selectFrom('users')
    .selectAll()
    .where('name', '=', username)

  return await query.executeTakeFirst()
}