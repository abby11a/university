import React from 'react'
import Router from 'next/router'
import Form from './form'
import { DeviceProps } from '@/components/Device'

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
    <Form onSubmit={submitData} deviceValues={emptyValues} />
  )
}

export default Create
