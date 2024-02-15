import React from 'react'
import Router from 'next/router'
import { DeviceProps } from '@/components/Device'
import Layout from '@/components/Layout';
import Form from '@/components/Form';
import styles from "../styles/device.module.css";
import { GetServerSideProps } from 'next';
import prisma from '@/lib/prisma';
import { Props } from './single-device/[id]';

/* Create a Device page - localhost:3000/create */

// Creating a list of empty values to add as the form vakues
const emptyValues: DeviceProps = {
  id: '',
  updatedAt: undefined,
  make: '',
  model: '',
  chipset: '',
  status: '',
  availability: undefined,
  location: '',
  farm: undefined,
  farmId: 0
}

// The create function creates a list of form fields that can add a device to the Prisma table
const Create: React.FC<Props> = (props: Props)=> {
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
      alert(error)
    }
  }

  return (
    <Layout>
      <h1 className={styles.heading}>Create Device</h1>
      <Form onSubmit={submitData} deviceValues={emptyValues} farmValues={props.farms} idUnvailable={false}/>
    </Layout>
  )
}

// Fetches the farm values from Prisma so that the user can choose the correct farm
export const getServerSideProps: GetServerSideProps = async () => {
  const farms = await prisma.farm.findMany();
  const deviceFarm = {farms: farms}
  return { props: { ...deviceFarm } }
}

export default Create
