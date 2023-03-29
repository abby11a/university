import React from "react";
import Link from "next/link";
import styles from "../styles/header.module.css";
import { signOut } from "next-auth/react";

export const Header: React.FC = () => {
	const isActive: (pathname: string) => boolean = (pathname) =>
	window.location.pathname === pathname;

	return (
		<nav className={styles.header}>
			<div className={styles.left}>
				<Link href="/" legacyBehavior>
					<a data-active={isActive("/")}>
						Device List
					</a>
				</Link>
			</div>
			<div className={styles.right}>
				<Link href="/create" legacyBehavior>
					<a data-active={isActive("/create")}>+ Create device</a>
				</Link>
				<button onClick={() => signOut()}>Sign Out</button>
			</div>
		</nav>
	);
};

export default Header;
