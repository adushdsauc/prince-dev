// lib/auth.ts
import type { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions: NextAuthOptions = {
  // Use JWT strategy (good for App Router)
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET, // set in .env.local

  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // Add Discord id/avatar to the JWT
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Discord profile has id & avatar
        token.discordId = (profile as any).id
        token.avatar = (profile as any).avatar ?? null
      }
      return token
    },

    // Expose fields on the session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token as any).discordId ?? session.user.id
        session.user.avatar = (token as any).avatar ?? null
      }
      return session
    },
  },
}
