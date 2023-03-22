import React from 'react'
import Router from 'next/router'
import Form from './form'
import { DeviceProps } from '@/components/Device'
import Layout from '@/components/Layout';

/* Create a Device page - localhost:3000/create */

const emptyValues: DeviceProps = {
  id: '',
  updatedAt: undefined,
  make: '',
  model: '',
  chipset: undefined,
  status: '',
  availability: undefined,
  location: '',
  farm: undefined
}

const Create = () => {
  const submitData = async (device: DeviceProps) => {
    try {
      await fetch(`/api/device`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(device),
      })
      await Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <h1>Create Device</h1>
      <Form onSubmit={submitData} deviceValues={emptyValues} idUnvailable={false}/>
    </Layout>
  )
}

export default Create
