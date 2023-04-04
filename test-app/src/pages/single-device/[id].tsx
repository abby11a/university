import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import Router from 'next/router';
import prisma from '../../lib/prisma';
import styles from "../../styles/device.module.css";
import Device, { DeviceProps } from '@/components/Device';
import Form from '@/components/Form';
import { TableHeader } from '@/components/TableHeader';
import { useSession } from 'next-auth/react';
// View, edit and delete a single device

// delete device
async function destroy(id: string): Promise<void> {
  if (window.confirm('Are you sure you want to delete this item?')) {
    await fetch(`/api/device/${id}`, {
      method: 'DELETE',
    })
    await Router.push('/')
  }
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
        }
      })
    })
    await Router.push('/')
  } catch (error) {
    console.error(error)
  }
}

const SingleDevice: React.FC<DeviceProps> = (props) => {
  const [edit, setEditView] = useState(false)
  const session = useSession();
  // edit device
  if (edit) {
    return (
      <Layout>
        <div>
          <h1 className={styles.heading}>Edit Device {props.id}</h1>
          <Form deviceValues={props} onSubmit={update} idUnvailable={true} />
        </div>
      </Layout>
    )
  } else {
    // view device
    return (
      <Layout>
        <div className={styles.singledevice}>
          <h2 className={styles.heading}>{props.id}</h2>
          <table>
            <TableHeader />
            <tbody>
              <Device device={props} />
            </tbody>
          </table>
          <div>
            <button className={styles.twobuttons} onClick={() => setEditView(true)}>
              Edit
            </button>
            {session.data?.user?.role === 'Admin' && (
              <button className={styles.twobuttons} onClick={() => destroy(props.id)}>
                Delete
              </button>
            )}
          </div>

        </div>
      </Layout>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = (Array.isArray(context.params?.id) ? context.params?.id[0] : context.params?.id)
  const device = await prisma.device.findUnique({where: { id }})
  return { props: { ...device } }
}

export default SingleDevice;
