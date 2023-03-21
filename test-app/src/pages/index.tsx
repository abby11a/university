import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Device, { DeviceProps } from '../components/Device'
import prisma from '../lib/prisma'
import { TableHeader } from '@/components/DeviceHeader'

// localhost:3000 (main page)
type Props = {
  devices: DeviceProps[]
}

// Returns the table
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
        <TableHeader />
        {tableBody(props)}
      </table>
    )
  }
}

// Returns list of devices in rows <tr><td>
const tableBody = (props: Props) => {
  return (
    <tbody>{
      props.devices.map((device) => {
        return (
          <Device
            key={device.id}
            device={device}
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