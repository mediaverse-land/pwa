import { authURL, baseURL } from "@/configs/base";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { OAuthConfig } from "next-auth/providers/oauth";

const PKCEProvider: OAuthConfig<any> = {
    id: "pkce-app",
    name: "PKCE App",
    type: "oauth",
    clientId: process.env.PKCE_CLIENT_ID,
    clientSecret: undefined,
    version: "2.0",
    checks: "pkce",
    authorization: {
        url: `${authURL}/oauth/authorize`,
        params: {
            response_type: "code",
            code_challenge_method: "S256",
            scope: "*",
        },
    },
    token: {
        url: `${authURL}/oauth/token`,
        async request({ params, provider, checks }) {
            let req = await fetch(`${authURL}/oauth/token`, {
                method: "POST",
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: provider.clientId ?? '',
                    code: params.code ?? '',
                    redirect_uri: provider.callbackUrl ?? '',
                    code_verifier: checks.code_verifier ?? "",
                    scope: "*",
                }),
            });

            const tokens = await req.json();
            return {tokens}
        },
    },
    userinfo: {
        url: `${baseURL}/profile`,
    },
    profile: async (profile, tokens) => {
        return {
            id: profile?.data?.id,
            firstName: profile?.data?.first_name || "",
            lastName: profile?.data?.last_name || "",
            image: profile?.data?.image_url || "",
            email: profile?.data?.email || "",
            cellphone: profile?.data?.cellphone || "",
            token: tokens.access_token,
            username: profile?.data?.username || "",
            address: profile?.data?.address || {},
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
        async jwt({token, user, session, trigger}) {
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
        async session({ session, token }) {
            session.user = session.user || {};
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
                default:
                    return data;
            }
        },
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID ?? "",
            clientSecret: process.env.TWITTER_CLIENT_SECRET ?? "",
        }),
        PKCEProvider,
    ],
    session: {
        maxAge: 60 * 60 * 24 * 365 * 100,
    },
};