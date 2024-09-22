'use server';

import * as Artists from '@/app/lib/dataAccess/artistRepository';
import * as Works from '@/app/lib/dataAccess/worksRepository';
import * as Composers from '@/app/lib/dataAccess/composerRepository';
import * as Performances from '@/app/lib/dataAccess/performanceRepository';

import { signIn, auth } from '@/auth';

import { redirect } from 'next/navigation';

export type State = {
  message?: string | null;
};

export async function createWork(formData: FormData) {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  const name = formData.get('name') as string;
  const composerId = Number(formData.get('composer'));

  const composer = await Composers.findOne(composerId);

  await Works.create(name, composerId, composer ? composer.name : 'anonymous');

  // needs validations

  redirect(`/works`)
}

export async function createArtist(formData: FormData) {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  const name = formData.get('name') as string;
  const firstname = formData.get('firstname') as string;
  const fach = formData.get('fach') as string;
  const conductor = false;

  Artists.create(name, firstname, fach, conductor);

  redirect(`/singers`)
}

export async function createPerformance(formData: FormData) {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }
  
  const date = formData.get('date') as string;
  const workId = Number(formData.get('work'));
  const conductorId = Number(formData.get('conductor'));
  const venueId = Number(formData.get('venue'));
  const chors = formData.getAll('chors').map(Number)
  const orchestras = formData.getAll('orchestras').map(Number)

  const result = await Performances.create(date, workId, venueId, conductorId, '')

  if (result) {
    await Performances.addOrchestras(result.id, orchestras)
    await Performances.addChors(result.id, chors)
    redirect(`/performances/${result.id}`)
  }
}

export async function addSingers(formData: FormData) {
  const singers = formData.getAll('singers').map(Number)
  const performance_id = Number(formData.get('performance'))

  await Performances.addSingers(performance_id, singers)
  redirect(`/performances/${performance_id}`)
}

export async function authenticate(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  
  try {
    await signIn('credentials', formData);
    redirect(`/`)
  } catch (error) {
    console.error('Failed to sign in', error);
    throw error;
  }
}