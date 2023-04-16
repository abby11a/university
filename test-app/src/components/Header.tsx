import React from "react";
import Link from "next/link";
import styles from "../styles/header.module.css";
import { signOut } from "next-auth/react";
import router, { useRouter } from "next/router";

/** Returns a page header with navigation to home page, create page and option to sign out */
export const Header: React.FC = () => {
	const uRouter = useRouter();
	const isActive: (pathname: string) => boolean = (pathname) => uRouter.pathname === pathname;

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
				<button onClick={()=>router.push("/create")} data-active={isActive("/create")}>Create Device</button>
				<button onClick={() => {signOut(); router.push("/")}}>Sign Out</button>
			</div>
		</nav>
	);
};

export default Header;
