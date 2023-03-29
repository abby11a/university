import React, { useState } from "react";
import Router from "next/router";
import styles from "../../styles/auth.module.css";

const SignUp: React.FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");

	const submitData = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			const body = { name, email, password, role };
			await fetch(`/api/user`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			await Router.push("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1 className={styles.h1}>Inventory Manager</h1>
			<div className={styles.signin}>
				<h2>Sign Up</h2>
				<form onSubmit={submitData}>
					<label className={styles.input}>
						Name
						<input
							autoFocus
							onChange={(e) => setName(e.target.value)}
							placeholder="Name"
							type="text"
							value={name}
						/>
					</label>
					<label className={styles.input}>
						Email Address
						<input
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email address"
							type="text"
							value={email}
						/>
					</label>
					<label className={styles.input}>
						Role
						<input
							onChange={(e) => setRole(e.target.value)}
							placeholder="Role"
							type="text"
							value={role}
						/>
					</label>
					<label className={styles.input}>
						Password
						<input
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							type="text"
							value={password}
						/>
					</label>
					<button
						className={styles.button}
						disabled={!name || !email || !password || !role}
						type="submit"
						value="Signup"
					>
						Sign up
					</button>
					<a
						className={styles.option}
						onClick={() => Router.push("/")}
					>
						or Cancel
					</a>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
