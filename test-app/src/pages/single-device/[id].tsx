import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import Router from 'next/router';
import prisma from '../../lib/prisma';
import styles from '@/styles/Post.module.css';
import Device, { DeviceProps } from '@/components/Device';
import { TableHeader } from '@/components/DeviceHeader';
import Form from '@/pages/form';

// delete device
async function destroy(id: string): Promise<void> {
  await fetch(`/api/device/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

const Post: React.FC<DeviceProps> = (props) => {
  const [edit, setEditView] = useState(false)
  // edit device
  if (edit) {
    const handleSubmit = (values: DeviceProps) => {
      console.log("Form submitted with values:", values);
      // Handle form submission logic here
    };

    return (
      <Layout>
        <div>
          <h2>{props.id}</h2>
          <Form deviceValues={props} onSubmit={handleSubmit} />
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
