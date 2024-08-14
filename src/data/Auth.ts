import { baseURL, imagePlaceHolders } from "@/configs/base";
import { AdapterUser, AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  // session: { strategy: "jwt" },
  callbacks: {
    // async session(params) {
    //   console.log(params);
    // },
    async redirect(params: { url: string; baseUrl: string }) {
      if (params.url.startsWith("https") || params.url.startsWith("/")) {
        return params.url;
      } else {
        return params.baseUrl;
      }
    },
    async jwt({ account, token, user, profile, session, trigger }) {
      if (user) {
        token.token = user.token;
        token.id = user.id;
        token.cellphone = user.cellphone;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.image = user.image;
        token.username = user.username;
      }
      if (trigger === "update") {
        token.cellphone = session?.cellphone || token.cellphone;
        token.firstName = session?.firstName || token.firstName;
        token.lastName = session?.lastName || token.lastName;
        token.email = session?.email || token.email;
        token.image = session?.image || token.image;
        token.username = session?.username || token.username;
        token.token = session?.token || token.token;
      }
      return token;
    },
    async session({ session, token, user, trigger }) {
      session.user.token = token.token;
      session.user.id = token.id;
      session.user.cellphone = token.cellphone;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.image = token.image;
      session.user.email = token.email;
      session.user.username = token.username;
      return session;
    },

    async signIn(data: any) {
      // console.log(data, "data");
      switch (data.account.provider) {
        case "google": {
          const req = await fetch(`${baseURL}/auth/google`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "en-US",
              "x-app": "_Web",
            },
            body: JSON.stringify({
              access_token: `${data.account.access_token}`,
            }),
          });
          const res = await req.json();
          // console.log(res, "res");
          if (req.ok) {
            data.user.token = res.token;
            data.user.cellphone = res.user.cellphone;
            data.user.id = res.user.id;
            return data;
          } else {
            throw new Error("Failed to login");
          }
        }

        case "facebook": {
          const req = await fetch(`${baseURL}/auth/facebook`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "en-US",
              "x-app": "_Web",
            },
            body: JSON.stringify({
              access_token: `${data.account.access_token}`,
            }),
          });
          const res = await req.json();
          // console.log(res, "res");
          if (req.ok) {
            return data;
          } else {
            throw new Error("Failed to login");
          }
        }
        default:
          return data;
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
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID ?? "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "customLogin",
      type: "credentials",
      name: "customLogin",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // If no error and we have user data, return it
        if (req.query) {
          const userInfo = JSON.parse(req.query.user) as AdapterUser;
          const user = {
            id: userInfo.id,
            firstName: userInfo.firstName || "",
            lastName: userInfo.lastName || "",
            image: userInfo.image,
            email: userInfo.email || "",
            cellphone: userInfo.cellphone || "",
            token: userInfo.token,
            username: userInfo.username,
          };
          return user;
        } else {
          throw new Error(`User Not Found`);
        }
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24 * 365 * 100,
  },
};
