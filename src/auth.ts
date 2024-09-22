import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import * as Users from '@/app/lib/dataAccess/userRepository';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials as { username: string, password: string };
        const user = await Users.findOne(username);

        if (!user || !bcrypt.compareSync(password, user.hashed_password)) {
          return null;
        }
        
        return user;
      },
    }),
  ],
});