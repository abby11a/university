import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    password: 'password',
    role: 'User'
  },
  {
    name: 'Abby',
    email: 'abby@prisma.io',
    password: 'password',
    role: 'Admin'
  },
  {
    name: 'Admin',
    email: 'admin@prisma.io',
    password: 'password',
    role: 'Admin'
  },
  {
    name: 'Regular',
    email: 'regular@prisma.io',
    password: 'password',
    role: 'User'
  }
]

const farmData: Prisma.FarmCreateInput[] = [
  {
    id: 1,
    floor: 3
  },
  {
    id: 2,
    floor: 4
  }
]

const deviceData: Prisma.DeviceCreateInput[] = [
    {
        id: "ID1",
        make: "Sony",
        model: "123",
        chipset: "abc",
        status: "Available",
        availability: true,
        location: "1290",
        farm: {
          connect: { id: 1 },
        }
    },
    {
        id: "ID2",
        make: "Apple",
        model: "234",
        chipset: "def",
        status: "Available",
        availability: true,
        location: "1291",
        farm: {
          connect: { id: 1 },
        }
    },
    {
        id: "ID3",
        make: "Samsung",
        model: "345",
        chipset: "uvw",
        status: "Available",
        availability: true,
        location: "2345",
        farm: {
          connect: { id: 2 },
        }
    },
    {
        id: "ID4",
        make: "Sony",
        model: "456",
        chipset: "xyz",
        status: "Available",
        availability: true,
        location: "2346",
        farm: {
          connect: { id: 2 },
        }
    }
]


async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const f of farmData) {
    const farm = await prisma.farm.create({
      data: f,
    })
    console.log(`Created farm with id: ${farm.id}`)
  }
  for (const d of deviceData) {
    const device = await prisma.device.create({
      data: d,
    })
    console.log(`Created device with id: ${device.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })