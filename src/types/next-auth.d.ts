import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        token: string;
        user: {
            name?: string;
            email?: string;
            role: string;
        }
    }

    interface User {
        name?: string;
        email?: string;
        token: string;
        role: string;
    }
}