import { authURL, baseURL } from "@/configs/base";
import { AdapterUser, AuthOptions, Awaitable, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { OAuthConfig } from "next-auth/providers/oauth";

const generatePKCEVerifier = (): string => {
    const length = 128;
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let verifier = "";
    for (let i = 0; i < length; i++) {
        verifier += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return verifier;
};

const generatePKCEChallenge = async (verifier: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
};

let codeVerifier: string | null = null;

const PKCEProvider: OAuthConfig<any> = {
    id: "pkce-app",
    name: "PKCE App",
    type: "oauth",
    clientId: process.env.PKCE_CLIENT_ID!,
    authorization: {
        url: `${authURL}/oauth/authorize`,
        params: async () => {
            codeVerifier = generatePKCEVerifier();
            const codeChallenge = await generatePKCEChallenge(codeVerifier);

            console.log("Code Verifier:", codeVerifier);
            return {
                response_type: "code",
                code_challenge_method: "S256",
                scope: "*",
                code_challenge: codeChallenge,
            };
        },
    },
    token: {
        url: authURL + "/oauth/token",
        params: async ({ code, redirectUri }: { code: string; redirectUri: string }) => {
            return {
                grant_type: "authorization_code",
                client_id: process.env.PKCE_CLIENT_ID,
                code: code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier
            };
        },
    },
    userinfo: {
        url: `${baseURL}/profile`,
    },
    profile(profile: any): Awaitable<User> {
        return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            username: profile.username || "",
            address: profile.address || "",
        };
    },
};

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
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
                token.address = user.address;
            }
            if (trigger === "update") {
                token.cellphone = session?.cellphone || token.cellphone;
                token.firstName = session?.firstName || token.firstName;
                token.lastName = session?.lastName || token.lastName;
                token.email = session?.email || token.email;
                token.image = session?.image || token.image;
                token.username = session?.username || token.username;
                token.token = session?.token || token.token;
                token.address = session?.address || token.address;
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
            session.user.address = token.address;
            return session;
        },

        async signIn(data: any) {
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

                    if (req.ok) {
                        data.user.token = res.token;
                        data.user.cellphone = res.user.cellphone;
                        data.user.id = res.user.id;
                        data.user.username = res.user.username;
                        data.user.firstName = res.user.first_name || "";
                        data.user.lastName = res.user.last_name || "";
                        data.user.address = res.user.address;
                        data.user.email = res.user.email || "";

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
            id: "customLogin",
            type: "credentials",
            name: "customLogin",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
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
                        address: userInfo.address,
                    };
                    return user;
                } else {
                    throw new Error(`User Not Found`);
                }
            },
        }),
        PKCEProvider,
    ],
    session: {
        maxAge: 60 * 60 * 24 * 365 * 100,
    },
};