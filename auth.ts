// auth.ts
import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: false,
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET, // paste the generated secret
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist Discord id, avatar, etc. on first login
      if (account && profile) {
        token.provider = "discord"
        // @ts-ignore - Discord profile includes id/avatar
        token.discordId = profile.id
        // @ts-ignore
        token.avatar = profile.avatar
      }
      return token
    },
    async session({ session, token }) {
      // Expose extra fields to client
      // @ts-ignore
      session.user.id = token.discordId ?? session.user.id
      // @ts-ignore
      session.user.avatar = token.avatar
      return session
    },
  },
})
