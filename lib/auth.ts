import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.username === (process.env.ADMIN_USERNAME ?? 'admin') &&
          credentials?.password === (process.env.ADMIN_PASSWORD ?? 'vinayak@admin2025')
        ) {
          return { id: '1', name: 'Admin', email: 'admin@vinayaktravels.com' }
        }
        return null
      },
    }),
  ],
  pages: { signIn: '/admin/login' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET ?? 'vinayak-travels-super-secret-2025',
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = 'admin'
      return token
    },
    async session({ session, token }) {
      if (token) (session.user as { role?: string }).role = token.role as string
      return session
    },
  },
}
