import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import prisma from '../lib/prisma'
import styles from '@/styles/Drafts.module.css'
import Device, { DeviceProps } from '@/components/Device'

// localhost:3000/draftDevices

type Props = {
  devices: DeviceProps[]
}

const listDevices = (props: Props) => {
  if (!props.devices) {
    return (
      <div>
        No Devices Listed
      </div>
    )
  } else {
    return (
      props.devices.map((device) => (
        <div key={device.Id} className={styles.post}>
          <Device device={{
            Id: device.Id,
            Make: device.Make,
            Model: device.Model,
            Status: device.Status,
            Chipset: device.Chipset
          }}  />
        </div>
      ))
    )
  }
}

const Drafts: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div>
        <h1>Devices</h1>
        <main>
          {listDevices(props)}
        </main>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const drafts = await prisma.device.findMany({
  })
  return {
    props: { drafts },
  }
}

export default Drafts
