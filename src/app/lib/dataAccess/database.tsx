import { Database } from './types'

import { createKysely } from "@vercel/postgres-kysely";

export const db = createKysely<Database>();
