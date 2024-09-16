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
  venues: VenueTable
  performances: PerformancesTable
  composers: ComposerTable
}

export interface ArtistTable {
  id: Generated<number>
  name: string
  firstname: string
  fach: string
  conductor: boolean
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}

export type Artist = Selectable<ArtistTable>
export type NewArtist = Insertable<ArtistTable>
export type ArtistUpdate = Updateable<ArtistTable>

export interface UserTable {
  id: Generated<string>
  firstname: string
  name: string
  email: string
  password: string
}

export type User = Selectable<UserTable>

export interface PerformancesTable {
  id: Generated<number>
  note: string
  date: ColumnType<Date, string | undefined, never>
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
  work_id: number
  artist_id: number
  venue_id: number
}

export type Performances = Selectable<PerformancesTable>

export interface VenueTable {
  id: Generated<number>
  name: string
  date: ColumnType<Date, string | undefined, never>
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
  street: string
  city: string
  country: string
}

export type Venues = Selectable<VenueTable>

export interface ComposerTable {
  id: Generated<number>
  name: string
  composer_id: number
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}

export type Composers = Selectable<ComposerTable>

export interface WorkTable {
  id: Generated<number>
  name: string
  composername: string
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}

export type Works = Selectable<WorkTable>