import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Device, { DeviceProps } from '../components/Device'
import prisma from '../lib/prisma'

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

// Table header
const tableHead = () => {
  return (
    <thead>
      <tr>
        <th>Id</th>
        <th>Make</th>
        <th>Model</th>
        <th>Chipset</th>
        <th>Status</th>
        <th>Availabilty</th>
        <th>Location</th>
        <th>Farm ID</th>
      </tr>
    </thead>
  )
}

// Returns list of devices in rows <tr><td>
const tableBody = (props: Props) => {
  return (
    <tbody>{
      props.devices.map((device) => {
        return (
          <Device
            key = {device.id}
            device = {device} 
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