import { useRef } from "react";
import { getProviders, getSession, signIn } from "next-auth/react"

const Signin = () => {
    const email = useRef("");
    const password = useRef("");
    return (
        <div>
            <h1>Inventory Manager</h1>
            <h3>Account Login</h3>

            <div>
                <form action="#" >
                    <label htmlFor="email">Email address
                        <input
                            type="text"
                            id="email"
                            autoFocus
                            onChange={(e) => (email.current = e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">Password
                        <input
                            type="text"
                            id="password"
                            onChange={(e) => (password.current = e.target.value)}
                        />
                    </label>
                    <button
                        type="button"
                        onClick={() => signIn("credentials", {
                            email: email.current, password: password.current
                        })}
                    >
                        Log in
                    </button>
                    <a href="/auth/signup">Sign Up</a>
                </form>
            </div>
        </div>
    )
}
export default Signin

export async function getServerSideProps(context: { req: any; }) {
    const { req } = context;
    const session = await getSession({ req });
    const providers = await getProviders()
    if (session) {
        return {
            redirect: { destination: "/" },
        };
    }
    return {
        props: {
            providers,
        },
    }
}