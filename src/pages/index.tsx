import React from 'react';
import { GetServerSideProps } from 'next';
import { DeviceProps, FarmProps } from '../components/Device';
import prisma from '../lib/prisma';
import { useSession } from "next-auth/react";
import HomePage from '../components/Home';
import Signin from './auth/signin';

// localhost:3000 (main page)
export type Props = {
  devices: DeviceProps[],
  farms: FarmProps[]
}

// Entry point, navigates the user to sign in or home page based on authentication status
const Index: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();

  // If authenticated return home page
  if (status === "authenticated") {
    return <HomePage {...props} />
  }

  // Else if unauthenticated return login page
  else {
    return (
      <Signin/>
    );
  }
}

// Get list of devices from prisma
export const getServerSideProps: GetServerSideProps = async (context) => {
  const devices = await prisma.device.findMany({});
  const farms = await prisma.device.findMany({});
  return {
    props: { devices: devices, farms: farms }
  }
}

export default Index;