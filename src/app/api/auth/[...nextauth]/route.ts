import { URL } from "@/services/contactService";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
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
    error: "/login",
  },
  // session: { strategy: "jwt" },
  callbacks: {
    async redirect(params) {
      // console.log(params, "params");
      if (params.url.startsWith("http") || params.url.startsWith("/")) {
        return params.url;
      } else {
        return params.baseUrl;
      }
    },
    async signIn(data: any) {
      console.log(data, "data");

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
          console.log(res, "res");
          if (req.ok) {
            cookies().set("user", JSON.stringify(res));
            return data;
          } else {
            throw new Error("Failed to login");
            return false;
          }
        }
        case "loginWithUsername": {
          return data;
        }
        case "loginWithOTP": {
          return data;
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
          console.log(res, "res");
          if (req.ok) {
            cookies().set("user", JSON.stringify(res));
            return data;
          } else {
            throw new Error("Failed to login");
          }
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

        console.log(credentials, "cred");
        console.log(req.query, "req");

        // If no error and we have user data, return it
        if (req.query) {
          console.log("success");
          const userInfo = JSON.parse(req.query.user);
          // const user = {
          //   cellphone: reqInfo.user.cellphone,
          //   code: reqInfo.user.status,
          //   id: reqInfo.user.id,
          // };
          cookies().set("user", JSON.stringify(userInfo));
          const user = {
            id: userInfo.user.id,
            name: `${userInfo.user.first_name} ${userInfo.user.last_name}`,
            image: userInfo.user.image,
            email: userInfo.user.email,
          };
          console.log(user, "user in auth");
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
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        cellphone: { label: "Cellphone", type: "text" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        console.log(credentials, "cred");
        console.log(req.query, "req");

        // If no error and we have user data, return it
        if (req.query) {
          console.log("success");
          const userInfo = JSON.parse(req.query.user);
          // const user = {
          //   cellphone: reqInfo.user.cellphone,
          //   code: reqInfo.user.status,
          //   id: reqInfo.user.id,
          // };
          cookies().set("user", JSON.stringify(userInfo));
          const user = {
            id: userInfo.user.id,
            name: `${userInfo.user.first_name} ${userInfo.user.last_name}`,
            image: userInfo.user.image,
            email: userInfo.user.email,
          };
          console.log(user, "user in auth");
          return user;
        } else {
          throw new Error(`User Not Found`);
        }
      },
    }),
  ],
});
export { handler as GET, handler as POST };
