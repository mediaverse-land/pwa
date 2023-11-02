import { URL } from "@/services/contactService";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // async session({ session, token }: any) {
    //   // console.log(token, "token");
    //   // console.log(session, "session");
    //   // Send properties to the client, like an access_token from a provider.
    //   session.id_token = token.id_token;
    //   return session;
    // },
    async signIn(data: any) {
      console.log(data, "data");
      const req = await fetch(`${URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en-US",
          "x-app": "_Web",
        },
        body: JSON.stringify({
          id_token: data.account.id_token,
        }),
      });
      const res = await req.json();
      console.log(res, "res");
      return true;
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
};
const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // async session({ session, token }: any) {
    //   // console.log(token, "token");
    //   // console.log(session, "session");
    //   // Send properties to the client, like an access_token from a provider.
    //   session.id_token = token.id_token;
    //   return session;
    // },
    async signIn(data: any) {
      console.log(data, "data");
      const req = await fetch(`${URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en-US",
          "x-app": "_Web",
        },
        body: JSON.stringify({
          id_token: data.account.id_token,
        }),
      });
      const res = await req.json();
      console.log(res, "res");
      return true;
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
});
export { handler as GET, handler as POST };
