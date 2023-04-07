import React from 'react'
import Router from 'next/router'
import { DeviceProps } from '@/components/Device'
import Layout from '@/components/Layout';
import Form from '@/components/Form';
import styles from "../styles/device.module.css";
import { GetServerSideProps } from 'next';

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
  farm: undefined,
  farmId: 0
}

const Create: React.FC = (props) => {
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
      <h1 className={styles.heading}>Create Device</h1>
      <Form onSubmit={submitData} deviceValues={emptyValues} farmValues={props.farms} idUnvailable={false}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const farms = await prisma.farm.findMany();
  const deviceFarm = {farms: farms}
  return { props: { ...deviceFarm } }
}

export default Create
