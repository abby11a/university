import React from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'
import styles from '@/components/Device.module.css'

// Each device component when listed

export type DeviceProps = {
  Id: string,
  Make: string,
  Model: string,
  Status: string,
  Chipset?: string
}

const Device: React.FC<{ device: DeviceProps }> = ({ device }) => {
  return (
    <tr key={device.Id} className={styles.Device} onClick={() => Router.push('/single-device/[id]', `/single-device/${device.Id}`)}>
      <td>{device.Id}</td>
      <td>{device.Make}</td>
      <td>{device.Model}</td>
      <td>{device.Status}</td>
    </tr>
  )
}

export default Device
