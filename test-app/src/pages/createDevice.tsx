import React, { useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'
import styles from '@/styles/Draft.module.css'

/* Create a Device page - localhost:3000/createDevices */

const Draft: React.FC = () => {
  const [Id, setId] = useState('')
  const [Make, setMake] = useState('')
  const [Model, setModel] = useState('')
  const [Chipset, setChipset] = useState('')
  const [Status, setStatus] = useState('')

  // refresh, fetch new data and navigate to '/'
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { Id, Make, Model, Chipset, Status }
      await fetch(`/api/device`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Create Device</h1>
          <input
            autoFocus
            onChange={(e) => setId(e.target.value)}
            placeholder="Id"
            type="text"
            value={Id}
          />
          <input
            onChange={(e) => setMake(e.target.value)}
            placeholder="Make"
            type="text"
            value={Make}
          />
          <textarea
            cols={50}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Model"
            rows={8}
            value={Model}
          />
          <textarea
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Status"
            rows={8}
            value={Status}
          />
          <textarea
            onChange={(e) => setChipset(e.target.value)}
            placeholder="Chipset"
            rows={8}
            value={Chipset}
          />
          <input
            disabled={!Id || !Make || !Model || !Status}
            type="submit"
            value="Create"
          />
          <a className={styles.black} href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
    </Layout>
  )
}

export default Draft
