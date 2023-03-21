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
          make: {
            contains: Array.isArray(searchString)
              ? searchString[0]
              : searchString,
          },
        },
        {
          model: {
            contains: Array.isArray(searchString)
              ? searchString[0]
              : searchString,
          },
        },
        {
          chipset: {
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
