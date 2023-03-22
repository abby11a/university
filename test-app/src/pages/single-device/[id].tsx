import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import Router from 'next/router';
import prisma from '../../lib/prisma';
import styles from '@/styles/Post.module.css';
import Device, { DeviceProps } from '@/components/Device';
import Form from '@/pages/form';
import { TableHeader } from '@/components/DeviceHeader';

// delete device
async function destroy(id: string): Promise<void> {
  await fetch(`/api/device/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

// Updates fields
async function update(device: DeviceProps): Promise<void> {
  try {
    await fetch(`/api/device/${device.id}/edit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: device.id, 
        data: {
          updatedAt: device.updatedAt,
          make: device.make, 
          model: device.model,
          chipset: device.chipset,
          status: device.status,
          availability: device.availability,
          location: device.location
        }}),
    })
    await Router.push('/')
  } catch (error) {
    console.error(error)
  }
}

const Post: React.FC<DeviceProps> = (props) => {
  const [edit, setEditView] = useState(false)
  // edit device
  if (edit) {
    return (
      <Layout>
        <div>
          <h1>Edit Device {props.id}</h1>
          <Form deviceValues={props} onSubmit={update} idUnvailable={true}/>
        </div>
      </Layout>
    )
  } else {
    // view device
    return (
      <Layout>
        <div>
          <h2>{props.id}</h2>
          <table>
            <TableHeader />
            <tbody>
              <Device device={props} />
            </tbody>
          </table>

          <button className={styles.button} onClick={() => setEditView(true)}>
            Edit
          </button>

          <button className={styles.button} onClick={() => destroy(props.id)}>
            Delete
          </button>
        </div>
      </Layout>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = (
    Array.isArray(context.params?.id)
      ? context.params?.id[0]
      : context.params?.id
  )
  const device = await prisma.device.findUnique({
    where: { id }
  })
  return { props: { ...device } }
}

export default Post
