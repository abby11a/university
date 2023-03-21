import React, { useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'
import styles from '@/styles/Draft.module.css'

/* Create a Device page - localhost:3000/create */

const Draft: React.FC = () => {
  const [id, setId] = useState('')
  // const [updatedAt, setUpdatedAt] = useState(Date.now())
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [chipset, setChipset] = useState('')
  const [status, setStatus] = useState('')
  const [availability, setAvailability] = useState(false)
  const [location, setLocation] = useState('')

  // refresh, fetch new data and navigate to '/'
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { id, make, model, chipset, status, availability, location }
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
            value={id}
          />
          <input
            onChange={(e) => setMake(e.target.value)}
            placeholder="Make"
            type="text"
            value={make}
          />
          <textarea
            cols={50}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Model"
            rows={8}
            value={model}
          />
          <textarea
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Status"
            rows={8}
            value={status}
          />
          <textarea
            onChange={(e) => setChipset(e.target.value)}
            placeholder="Chipset"
            rows={8}
            value={chipset}
          />
          <textarea
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            rows={8}
            value={location}
          />
          <input
            disabled={!id || !make || !model || !status}
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
