import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/components/Header.module.css'
import { signOut } from 'next-auth/react'

export const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  return (
    <nav>
      <div className={styles.left}>
        <Link href="/" legacyBehavior>
          <a className={styles.bold} data-active={isActive('/')}>
            Device List
          </a>
        </Link>
      </div>
      <div className={styles.right}>
        <Link href="/create" legacyBehavior>
          <a data-active={isActive('/create')}>+ Create device</a>
        </Link>
        <button onClick={()=>signOut()}>
          Sign Out
        </button>
      </div>
    </nav>
  )
}

export default Header
