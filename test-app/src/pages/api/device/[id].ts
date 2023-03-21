import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const postId = req.query.id

  switch (req.method) {
    case 'DELETE':
      return handleDELETE(String(postId), res)

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`,
      )
  }
}

// DELETE /api/device/:id
async function handleDELETE(Id: string, res: NextApiResponse<any>) {
  const post = await prisma.device.delete({
    where: { Id },
  })
  return res.json(post)
}
