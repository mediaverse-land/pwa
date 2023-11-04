import { URL } from "@/services/contactService";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

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

      switch (data.account.provider) {
        case "google":
          const req = await fetch(`${URL}/auth/google`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "en-US",
              "x-app": "_Web",
            },
            body: JSON.stringify({
              id_token: `${data.account.access_token}`,
            }),
          });
          const res = await req.json();
          console.log(res, "res");
          if (req.ok) {
            cookies().set("uesr", JSON.stringify(res));
            return true;
          } else {
            throw new Error("Failed to login");
            return false;
          }

        default:
          return false;
      }
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
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "loginWithUsername",
      name: "Login With Username",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${URL}/auth/sign-in`, {
          method: "POST",
          body: JSON.stringify(req.query),
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": "en-US",
            "x-app": "_Web",
          },
        });
        const user = await res.json();
        console.log(credentials, "cred");
        // console.log(req, "req");
        console.log(user, "user");
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        // return null;
      },
    }),
  ],
});
export { handler as GET, handler as POST };
