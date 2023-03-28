import React, { useState } from 'react'
import Router from 'next/router'

const SignUp: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { name, email, password, role }
      await fetch(`/api/user`, {
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
    <div>
      <form onSubmit={submitData}>
        <h1>Signup user</h1>
        <input
          autoFocus
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="text"
          value={name}
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          type="text"
          value={email}
        />
        <input
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          type="text"
          value={role}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="text"
          value={password}
        />
        <input disabled={!name || !email || !password || !role} type="submit" value="Signup" />
        <a href="#" onClick={() => Router.push('/')}>
          or Cancel
        </a>
      </form>
    </div>
  )
}

export default SignUp
