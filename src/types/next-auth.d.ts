import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      access_token?: string;
      refresh_token?: string;
      token?: string;
      id?: string;
      image?: string | null;
      firstName: string;
      lastName: string;
      email?: string | null;
      cellphone?: string | null;
      username: string | null;
      address: string | null;
      country: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    token?: string;
    id?: string;
    image?: string | null;
    firstName: string;
    lastName: string;
    email?: string | null;
    cellphone?: string | null;
    username: string | null;
    address: string | null;
    country: string | null;
  }
}

declare module "next-auth" {
  interface User {
    token?: string;
    id?: string;
    image?: string | null;
    firstName: string;
    lastName: string;
    email?: string | null;
    cellphone?: string | null;
    username: string | null;
    address: string | null;
    country: string | null;
  }

  interface AdapterUser {
    token?: string;
    id?: string;
    image?: string | null;
    firstName: string;
    lastName: string;
    email?: string | null;
    cellphone?: string | null;
    username: string | null;
    address: string | null;
    country: string | null;
  }
}
