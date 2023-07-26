import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import makeRequest from '@/utils/makeRequest';
import { users } from '@/data/users';

// for testing purposes
async function mockCredentialsProvider(credentials) {
  try {
    const user = users.find((u) => u.email === credentials.email);

    if (user && (await compare(credentials.password, user.password))) {
      return { id: user.id, username: user.username, email: user.email };
    }

    return null;
  } catch (error) {
    console.log(error);
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        // const res = await makeRequest('POST', '/login', credentials);
        // const user2 = await res;

        // if (res.ok && user) {
        //   return user;
        // }

        //...............................................................................
        const user = await mockCredentialsProvider(credentials);

        if (user) {
          console.log(user);

          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  pages: { signIn: '/login' },

  session: {
    strategy: 'jwt',
  },
});
