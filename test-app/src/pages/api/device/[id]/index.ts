import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

/**  
 * /api/device/[id]
 * Deletes a device from database if method is DELETE
*/
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

async function handleDELETE(id: string, res: NextApiResponse<any>) {
  const device = await prisma.device.delete({
    where: { id },
  })
  return res.json(device)
}
