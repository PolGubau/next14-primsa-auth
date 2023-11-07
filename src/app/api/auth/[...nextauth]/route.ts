import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@polui.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*********",
        },
      },
      authorize: async (credentials, req) => {
        const creds = {
          email: credentials?.email,
          password: credentials?.password,
        };

        if (!creds.email || !creds.password) return null;

        const userFound = await db.user.findUnique({
          where: {
            email: creds.email,
          },
        });

        if (!userFound) {
          return null;
        }

        const matchPassword = await bcrypt.compare(
          creds.password,
          userFound.password
        );

        console.log(matchPassword);

        if (!matchPassword) {
          return null;
        }

        return {
          id: userFound.id.toString(),
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
