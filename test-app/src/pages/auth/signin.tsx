import { useRef } from "react";
import { getProviders, getSession, signIn } from "next-auth/react";
import styles from "../../styles/auth.module.css";
import router from "next/router";
import Link from "next/link";

/** Returns a sign in page, which allows users to log in using their credentials which are stored in the SQLite database */
const Signin = () => {
	const email = useRef("");
	const password = useRef("");

	const submitData = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		signIn("credentials", {
			email: email.current,
			password: password.current,
			redirect: false,
		}).then((response) => {
			if (response?.status != 200) {
				const errorObj = JSON.parse(response?.error ?? "");
				if (errorObj && typeof errorObj.message === "string"){
					alert(errorObj.message)
				} else {
					alert("There is a problem signing in")
					console.log(response)
				}
			} else {
				router.push("/");
			}
		});
	};

	return (
		<div>
			<h1 className={styles.h1}>Inventory Manager</h1>
			<div className={styles.signin}>
				<h2>Account Login</h2>
				<form action="#" onSubmit={submitData}>
					<label htmlFor="email" className={styles.input}>
						Email address
						<input
							type="text"
							id="email"
							autoFocus
							onChange={(e) => (email.current = e.target.value)}
						/>
					</label>
					<label htmlFor="password" className={styles.input}>
						Password
						<input
							type="password"
							id="password"
							onChange={(e) => (password.current = e.target.value)}
						/>
					</label>
					<button
						className={styles.button}
						disabled={!email || !password}
						type="submit"
						value="Signin"
					>
						Sign in
					</button>
					<Link className={styles.option} href="/auth/signup">
						Sign Up
					</Link>
				</form>
			</div>
		</div>
	);
};
export default Signin;

export async function getServerSideProps(context: { req: any }) {
	const { req } = context;
	const session = await getSession({ req });
	const providers = await getProviders();
	if (session) {
		return { redirect: { destination: "/" } };
	}
	return { props: { providers } };
}
