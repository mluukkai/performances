import { db } from './database'
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres'

export async function findAll() {
  const query = db
    .selectFrom('performances')
    .leftJoin('works', 'works.id', 'performances.work_id')
    .leftJoin('composers', 'composers.id', 'works.composer_id')
    .leftJoin('artists', 'artists.id', 'performances.artist_id')
    .select([
      'performances.id', 'performances.date', 'works.name as work', 
      'composers.name as composer', 'artists.name as conductor'
    ]).orderBy('performances.date', 'desc')

  return await query.execute()
}

export async function findOne(id: number) {
  const query = db
    .selectFrom('performances')
    .leftJoin('works', 'works.id', 'performances.work_id')
    .leftJoin('artists', 'artists.id', 'performances.artist_id')
    .leftJoin('venues', 'venues.id', 'performances.venue_id')
    .select([
      'performances.id', 'performances.date', 'works.name as work', 
      'artists.name as conductor',
    ])
    .select((eb) => [
      jsonObjectFrom(
        eb.selectFrom('artists')
          .select(['artists.id as id', 'artists.name as name',  'artists.firstname as firstname'])
          .whereRef('artists.id', '=', 'performances.artist_id')
      ).as('conductor'),
      jsonObjectFrom(
        eb.selectFrom('venues')
          .select(['venues.id as id', 'venues.name as name'])
          .whereRef('venues.id', '=', 'performances.venue_id')
      ).as('venue'),
      jsonObjectFrom(
        eb.selectFrom('composers')
          .select(['composers.id as id', 'composers.name as name'])
          .whereRef('composers.id', '=', 'works.composer_id')
      ).as('composer'),
      jsonArrayFrom(
        eb.selectFrom('orchestras')
          .leftJoin('orchestras_performances', 'orchestras.id', 'orchestras_performances.orchestra_id')
          .select(['orchestras.id', 'orchestras.name'])
          .whereRef('orchestras_performances.performance_id', '=', 'performances.id')
      ).as('orchestras'),
      jsonArrayFrom(
        eb.selectFrom('chors')
          .leftJoin('chors_performances', 'chors.id', 'chors_performances.chor_id')
          .select(['chors.id', 'chors.name'])
          .whereRef('chors_performances.performance_id', '=', 'performances.id')
      ).as('choruses'),
      jsonArrayFrom(
        eb.selectFrom('artists')
          .leftJoin('artists_performances', 'artists.id', 'artists_performances.artist_id')
          .select(['artists.id', 'artists.name', 'artists.fach', 'artists.firstname'])
          .whereRef('artists_performances.performance_id', '=', 'performances.id')
      ).as('solists'),
    ])
    .where('performances.id', '=', id)

  return await query.executeTakeFirst() 
}

export async function create(date: string, work_id: number, venue_id: number, artist_id: number, note: string ) {
  const result = await db
    .insertInto('performances')
    .values({
      work_id, venue_id, artist_id,
      note,
      date: new Date(date).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()  
    })
    .returning('id')
    .executeTakeFirst()

  return result
}

export async function addOrchestras(performance_id: number, orchestras: number[]) {
  for (let orchestra_id of orchestras) {
    await db
      .insertInto('orchestras_performances')
      .values({
        performance_id, orchestra_id,
      })
      .executeTakeFirst()
  }

}

export async function addChors(performance_id: number, chors: number[]) {
  for (let chor_id of chors) {
    await db
    .insertInto('chors_performances')
    .values({
      performance_id, chor_id,
    })
    .executeTakeFirst()
  }
}

export async function addSingers(performance_id: number, singers: number[]) {
  for (let artist_id of singers) {
    await db
    .insertInto('artists_performances')
    .values({
      performance_id, artist_id,
    })
    .executeTakeFirst()
  }
}