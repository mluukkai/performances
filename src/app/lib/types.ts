import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely'

export interface Database {
  artists: ArtistTable
  users: UserTable
}

export interface ArtistTable {
  id: Generated<number>
  firstname: string
  name: string
  fach: string
  conductor: string
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}

export interface UserTable {
  id: Generated<string>
  firstname: string
  name: string
  email: string
  password: string
}

export type User = Selectable<UserTable>

export type Artist = Selectable<ArtistTable>
export type NewArtist = Insertable<ArtistTable>
export type ArtistUpdate = Updateable<ArtistTable>
