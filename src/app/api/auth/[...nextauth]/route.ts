import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { baseURL } from "@/configs/base";
import { authOptions } from "@/data/Auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
