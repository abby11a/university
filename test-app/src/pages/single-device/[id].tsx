import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import Router from 'next/router'
import prisma from '../../lib/prisma'
import styles from '@/styles/Post.module.css'
import Device, { DeviceProps } from '@/components/Device'

async function publish(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

// delete device
async function destroy(id: string): Promise<void> {
  await fetch(`/api/device/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

const Post: React.FC<DeviceProps> = (props) => {
  let title = props.Id

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <Device device={props}/>
      
          <button className={styles.button} onClick={() => publish(props.Id)}>
            Publish
          </button>
        
        <button className={styles.button} onClick={() => destroy(props.Id)}>
          Delete
        </button>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const Id = (
    Array.isArray(context.params?.id)
      ? context.params?.id[0]
      : context.params?.id
  )
  const device = await prisma.device.findUnique({
    where: { Id }
  })
  return { props: { ...device } }
}

export default Post
