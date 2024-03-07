import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

/**  
 * Used to authorise the user
 * Uses the secret in .env file
*/
export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Enter email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter Password",
                },
            },

            async authorize(credentials, req) {
                const { email, password } = credentials;
                const baseUrl =  process.env.NEXTAUTH_URL ? `https://${process.env.NEXTAUTH_URL}` : "http://localhost:3000";
                const apiUrl = `${baseUrl}/api/login`;

                console.log(baseUrl);
                console.log(apiUrl);

                const res = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password
                    }),
                });
                const result = await res.json();
                if (res.ok && result) {
                    return result;
                } else {
                    throw new Error(JSON.stringify(result));
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token;
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
    }
}
export default NextAuth(authOptions)