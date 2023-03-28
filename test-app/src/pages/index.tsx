import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Device, { DeviceProps } from '../components/Device'
import prisma from '../lib/prisma'
import { TableHeader } from '@/components/TableHeader'
import { useSession, signIn } from "next-auth/react"

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
  const { data: session, status } = useSession()

  // Authenticated
  if (status === "authenticated") {
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

  // Unauthenticated
  } else { 
    return (
      <section>
        <div>
          <h2>Welcome To Inventory Manager</h2><br />
          <p>You currently not authenticated.</p>
          <button type="button" onClick={() => signIn()}>
            Login
          </button>
        </div>
      </section>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  const devices = await prisma.device.findMany({})
  return {
    props: { devices },
  }
}

export default Devices;