import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST /api/device
// Required fields in body: id, make, model, status, location
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, updatedAt, make, model, chipset, status, availability, location, farmId } = req.body
  const result = await prisma.device.create({
    data: {
      id,
      updatedAt,
      make,
      model,
      chipset,
      status,
      availability,
      location,
      farmId
    },
  })
  return res.status(201).json(result)
}
