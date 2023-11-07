import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
export const authOptions = {
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

        if (!creds.email || !creds.password) throw new Error("No creds");

        const userFound = await db.user.findUnique({
          where: {
            email: creds.email,
          },
        });

        if (!userFound) {
          throw new Error("User not found");
        }

        const matchPassword = await bcrypt.compare(
          creds.password,
          userFound.password
        );

        if (!matchPassword) {
          throw new Error("Password is incorrect");
        }

        return {
          id: userFound.id.toString(),
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
