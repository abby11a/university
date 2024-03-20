import React, { ReactNode } from 'react'
import Header from './Header'
import styles from '../styles/Layout.module.css'

type Props = {
  children: ReactNode
}

/** Adds the Header to the page */
const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className={styles.layout}>{props.children}</div>
  </div>
)

export default Layout
