import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Device, { DeviceProps } from '../components/Device'
import prisma from '../lib/prisma'
import styles from '@/styles/Device.module.css'
// localhost:3000 (main page)

type Props = {
  devices: DeviceProps[]
}

const devicesTable = (props: Props) => {
  if (!props.devices) {
    console.log(props)
    return (
      <div>
        No Devices Listed
      </div>
    )
  } else {
    return (
      <table>
        {tableHead()}
        {tableBody(props)}
      </table>
    )
  }
}

// table header
const tableHead = () => {
  return (
    <thead>
      <tr>
        <th>Id</th>
        <th>Make</th>
        <th>Model</th>
        <th>Status</th>
      </tr>
    </thead>
  )
}

// List of devices
const tableBody = (props: Props) => {
  return (
    <tbody>{
      props.devices.map((device) => {
        return (
          <Device
            key = {device.Id}
            device = {{
              Id: device.Id,
              Make: device.Make,
              Model: device.Model,
              Status: device.Status,
              Chipset: device.Chipset
            }} 
          />
        )
      })
    }</tbody>
  )
}

const Devices: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div>
        <h1>Devices</h1>
        <main>
          {devicesTable(props)}
        </main>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const devices = await prisma.device.findMany({})
  return {
    props: { devices },
  }
}

export default Devices;