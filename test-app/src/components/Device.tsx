import React from 'react'
import Router from 'next/router'
import styles from '@/components/Device.module.css'

// Datatype for each device
export type DeviceProps = {
  id: string,
  updatedAt?: Date,
  make: string,
  model: string,
  chipset?: string,
  status: string,
  availability?: Boolean,
  location: string,
  farm?: {}
}

// Returns a table row of device attributes
const Device: React.FC<{ device: DeviceProps }> = ({ device }) => {
  return (
    <tr key={device.id} className={styles.Device} onClick={() => Router.push('/single-device/[id]', `/single-device/${device.id}`)}>
      <td>{device.id}</td>
      <td>{device.make}</td>
      <td>{device.model}</td>
      <td>{device.chipset}</td>
      <td>{device.status}</td>
      <td>{String(device.availability)}</td>
      <td>{device.location}</td>
    </tr>
  )
}

export default Device
