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
      address: {
        city_id: string | null;
        country_iso: string;
        id: string;
        line1: string | null;
        line2: string | null;
        postal_code: string | null;
        user_id: string;
        country?: {
          iso: string;
          name: string;
          title: string;
          calling_code: string;
        };
      };
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
    address: {
      city_id: string | null;
      country_iso: string;
      id: string;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      user_id: string;
    };
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
    address: {
      city_id: string | null;
      country_iso: string;
      id: string;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      user_id: string;
    };
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
    address: {
      city_id: string | null;
      country_iso: string;
      id: string;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      user_id: string;
    };
  }
}
