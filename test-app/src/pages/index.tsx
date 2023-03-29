import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Device, { DeviceProps } from '../components/Device';
import prisma from '../lib/prisma';
import { TableHeader } from '@/components/TableHeader';
import { useSession, signIn } from "next-auth/react";
import styles from "../styles/device.module.css";

// localhost:3000 (main page)
type Props = {
  devices: DeviceProps[]
}

const filterOptions = [
  { value: '', label: 'All' },
  { value: 'id', label: 'ID' },
  { value: 'make', label: 'Make' },
  { value: 'model', label: 'Model' },
  { value: 'chipset', label: 'Chipset' },
  { value: 'status', label: 'Status' },
  { value: 'availability', label: 'Availability' },
  { value: 'location', label: 'Location' },
  { value: 'farmId', label: 'Farm ID' }
];

// Returns the table
const devicesTable = (props: Props) => {
  if (!props.devices) {
    console.log(props);
    return (
      <div>
        No Devices Listed
      </div>
    )
  } else {
    return (
      <table
        className={styles.table}>
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
  const { data: session, status } = useSession();
  const [search, setSearch] = useState('');
  const [filterFeature, setFilterFeature] = useState('');

  const filteredDevices = props.devices.filter((item: DeviceProps) => {
    if (!filterFeature) {
      return Object.values(item).some((value) =>
        value ? value.toString().toLowerCase().includes(search.toLowerCase()) : false
      );
    } else {
      return (item as any)[filterFeature].toString().toLowerCase().includes(search.toLowerCase());
    }
  });

  // Authenticated
  if (status === "authenticated") {
    return (
      <Layout>
        <div>
          <h1 className={styles.heading}>Devices</h1>
          <main className={styles.devices}>
            <div className={styles.filter}>
              <select id="filter" value={filterFeature} onChange={(e) => setFilterFeature(e.target.value)}>
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {devicesTable({ devices: filteredDevices })}
          </main>
        </div>
      </Layout>
    )

    // Unauthenticated
  } else {
    return (
      <section>
        <div>
          <h2 className={styles.heading}>Welcome To Inventory Manager</h2><br />
          <p className={styles.text}>You currently not authenticated.</p>
          <button className={styles.button} type="button" onClick={() => signIn()}>
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
    props: { devices }
  }
}

export default Devices;