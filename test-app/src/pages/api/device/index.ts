import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { Id, Make, Model, Status } = req.body
  const result = await prisma.device.create({
    data: {
      Id,
      Make,
      Model,
      Status
    },
  })
  return res.status(201).json(result)
}
