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
    ])

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