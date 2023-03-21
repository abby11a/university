import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

// GET /api/filterDevices?searchString=:searchString
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { searchString } = req.query
  const resultDevices = await prisma.device.findMany({
    where: {
      OR: [
        {
          Make: {
            contains: Array.isArray(searchString)
              ? searchString[0]
              : searchString,
          },
        },
        {
          Model: {
            contains: Array.isArray(searchString)
              ? searchString[0]
              : searchString,
          },
        },
        {
          Chipset: {
            contains: Array.isArray(searchString)
              ? searchString[0]
              : searchString,
          },
        },
      ],
    },
  })
  return res.json(resultDevices)
}
