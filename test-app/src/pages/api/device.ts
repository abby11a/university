import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

// POST /api/device
// Required fields in body: id, make, model
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await prisma.device.create({
    data: {
      ...req.body,
    },
  })
  return res.status(201).json(result)
}
