import React from 'react'
import Router from 'next/router'
import styles from "../styles/device.module.css";

export type FarmProps = {
  id: number,
  floor: number
}

// Datatype for each device
export type DeviceProps = {
  id: string, // primary key
  updatedAt?: Date,
  make: string,
  model: string,
  chipset?: string,
  status: string,
  availability?: Boolean,
  location: string,
  farmId: number, // foreign key
  farm?: FarmProps
}

/** Returns a table row of device attributes */
const Device: React.FC<{ device: DeviceProps }> = ({ device }) => {
  return (
    <tr key={device.id} className={styles.Device} data-testid={"device"} onClick={() => Router.push('/single-device/[id]', `/single-device/${device.id}`)}>
      <td>{device.id}</td>
      <td>{device.make}</td>
      <td>{device.model}</td>
      <td>{device.chipset}</td>
      <td>{device.status}</td>
      <td>{String(device.availability)}</td>
      <td>{device.location}</td>
      <td>{JSON.stringify(device.farmId)}</td>
    </tr>
  )
}

export default Device
