import { URL } from "@/services/contactService";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";

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
      if (params.url.startsWith("http") || params.url.startsWith("/")) {
        return params.url;
      } else {
        return params.baseUrl;
      }
    },
    async session({ session, token, user, trigger }) {
      session.user.token = token.token;
      session.user.id = token.id;
      session.user.cellphone = token.cellphone;
      return session;
    },
    async jwt({ account, token, user, profile, session, trigger }) {
      if (user) {
        token.token = user.token;
        token.id = user.id;
        token.cellphone = user.cellphone;
      }
      if (trigger === "update") {
        token.name = session.name;
        token.email = session.email;
        token.picture = session.picture;
        token.id = session.id;
      }
      return token;
    },
    async signIn(data: any) {
      // console.log(data, "data");

      switch (data.account.provider) {
        case "google": {
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
          const req = await fetch(`${URL}/auth/facebook`, {
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
        case "loginWithUsername": {
          // console.log(data, "username login");
          return data;
        }
        case "loginWithOTP": {
          return data;
        }
        case "signUpWithOTP": {
          return data;
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
      id: "loginWithUsername",
      type: "credentials",
      name: "Login With Username",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // If no error and we have user data, return it
        if (req.query) {
          // console.log("success");
          const userInfo = JSON.parse(req.query.user);
          // console.log(userInfo);
          // const user = {
          //   cellphone: reqInfo.user.cellphone,
          //   code: reqInfo.user.status,
          //   id: reqInfo.user.id,
          // };
          const user = {
            id: userInfo.user.id,
            name: `${userInfo.user.first_name || ""} ${
              userInfo.user.last_name || ""
            }`,
            image: userInfo.user.image,
            email: userInfo.user.email,
            cellphone: userInfo.user.cellphone,
            token: userInfo.token,
          };
          // console.log(user, "user in auth");
          return user;
        } else {
          throw new Error(`User Not Found`);
        }
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "loginWithOTP",
      type: "credentials",
      name: "Login With OTP",
      credentials: {
        cellphone: { label: "Cellphone", type: "text" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials, req) {
        // If no error and we have user data, return it
        if (req.query) {
          // console.log("success");
          const userInfo = JSON.parse(req.query.user);
          // const user = {
          //   cellphone: reqInfo.user.cellphone,
          //   code: reqInfo.user.status,
          //   id: reqInfo.user.id,
          // };
          const user = {
            id: userInfo.user.id,
            token: userInfo.token,
            name: `${userInfo.user.first_name || ""} ${
              userInfo.user.last_name || ""
            }`,
            image: userInfo.user.image,
            email: userInfo.user.email,
            cellphone: userInfo.user.cellphone,
          };
          // console.log(user, "user in auth");
          return user;
        } else {
          throw new Error(`User Not Found`);
        }
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "signUpWithOTP",
      type: "credentials",
      name: "Sign up With OTP",
      credentials: {
        cellphone: { label: "Cellphone", type: "text" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials, req) {
        // If no error and we have user data, return it
        if (req.query) {
          // console.log("success");
          const userInfo = JSON.parse(req.query.user);
          // const user = {
          //   cellphone: reqInfo.user.cellphone,
          //   code: reqInfo.user.status,
          //   id: reqInfo.user.id,
          // };
          const user = {
            id: userInfo.user.id,
            token: userInfo.token,
            name: `${userInfo.user.first_name || ""} ${
              userInfo.user.last_name || ""
            }`,
            image: userInfo.user.image,
            email: userInfo.user.email,
            cellphone: userInfo.user.cellphone,
          };
          // console.log(user, "user in auth");
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
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
