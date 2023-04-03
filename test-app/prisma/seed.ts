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
    },
    {
        id: "ID2",
        make: "Sony",
        model: "123",
        chipset: "abc",
        status: "Available",
        availability: true,
        location: "1291",
    },
    {
        id: "ID3",
        make: "Sony",
        model: "123",
        chipset: "abc",
        status: "Available",
        availability: true,
        location: "1293",
    },
    {
        id: "ID4",
        make: "Sony",
        model: "123",
        chipset: "abc",
        status: "Available",
        availability: true,
        location: "1294",
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
  for (const d of deviceData) {
    const device = await prisma.device.create({
      data: d,
    })
    console.log(`Created user with id: ${device.id}`)
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