import moment from "moment";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import prisma from '@/libs/prismadb'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt'
import { signJwtAccessToken } from "@/libs/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

//https://next-auth.js.org/guides/fullstack
//https://authjs.dev/guides/basics/refresh-token-rotation

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    CredentialsProvider({
        name: "credentials",
        credentials: {
            email: { label: "Email", type: "text", placeholder: "email" },
            password: { label: "Password", type: "password" },
            username: { label: "Username", type: "text", placeholder: "user name" },
        },
        async authorize(credentials: Record<"email" | "password" | "username", string> | undefined) {
          
            // check to see if email and password is there
            if(!credentials || !credentials.email || !credentials.password) {
                throw new Error('Please enter an email and password')
            }

            // check to see if user exists
            let user = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                }
            });

            // if no user was found 
            if (!user || !user?.hashedPassword) {
                throw new Error('No user found')
            }

            // check to see if password matches
            const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

            // if password does not match
            if (!passwordMatch) {
                throw new Error('Incorrect password')
            }

            
            const { hashedPassword, ...userWithoutPass } = user;
            const accessToken = signJwtAccessToken(userWithoutPass);
            user = {
                ...userWithoutPass,
                access_token: accessToken,
            };
            
            return user;
        },
    }),  
  ],
  callbacks: {
    async jwt({ token, user, account }) {

      if (account) {
        if (account.provider === "google") {
          // If the access token has expired, try to refresh it
          if (Date.now() >= token.expires_at * 1000) {
            try {
              // https://accounts.google.com/.well-known/openid-configuration
              // We need the `token_endpoint`.
              if(token.refresh_token) {
                const response = await fetch("https://oauth2.googleapis.com/token", {
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: new URLSearchParams({
                    client_id: process.env.GOOGLE_CLIENT_ID as string,
                    client_secret: googleClientSecret,
                    grant_type: "refresh_token",
                    refresh_token: token.refresh_token as string,
                  }),
                  method: "POST",
                })
    
                const tokens = await response.json();

                if (!response.ok) throw tokens
    
                // Save the access token and refresh token in the JWT on the initial login
                token.access_token = tokens.access_token;
                token.expires_at = Math.floor(Date.now() / 1000 + tokens.expires_at);
                token.refresh_token = tokens.refresh_token;
              } else {
                token.error = "Login error";
              }
            } catch (error) {
              // The error property will be used client-side to handle the refresh token error
              token.error = "Login error";
            }
          } else {
            // Save the access token and refresh token in the JWT on the initial login
            token.access_token = account.access_token;
            token.expires_at = Math.floor(Date.now() / 1000 + account.expires_at);
            token.refresh_token = account.refresh_token;
          }
        }
      } else {
        //TODO check expire token when login with normal mode
        // if (Date.now() >= token.expires_at * 1000) {
        // }
      }

      // const response = await fetch("http://localhost:3000/api/user/verify_token", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     token: token.access_token
      //   }),
      // })

      // const tokens = await response.json();


      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 60*1 = 1' ; 60*60 = 1h
  }
});

// declare module "@auth/core/types" {
//   interface Session {
//     error?: "RefreshAccessTokenError"
//   }
// }

// declare module "@auth/core/jwt" {
//   interface JWT {
//     access_token: string
//     expires_at: number
//     refresh_token: string
//     error?: "RefreshAccessTokenError"
//   }
// }

export { handler as GET, handler as POST };
