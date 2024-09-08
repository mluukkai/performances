import { Database } from './types'
/*
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'verceldb',
    host: 'ep-morning-tree-a22wl6zb-pooler.eu-central-1.aws.neon.tech',
    user: 'default',
    password: 'UuQdhsoc2n4k',
    port: 5434,
    max: 10,
  })
})

export const db = new Kysely<Database>({
  dialect,
})
*/

import { createKysely } from "@vercel/postgres-kysely";

export const db = createKysely<Database>();

/*

POSTGRES_USER="default"
POSTGRES_HOST="ep-morning-tree-a22wl6zb-pooler.eu-central-1.aws.neon.tech"
POSTGRES_PASSWORD="UuQdhsoc2n4k"
POSTGRES_DATABASE="verceldb"

*/