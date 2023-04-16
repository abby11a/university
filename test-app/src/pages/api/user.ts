import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

/**  
 * POST /api/user
 * Required fields in body: name, email, password
 * Adds an entry to the user database, used to sign a user up
*/
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await prisma.user.create({
    data: {
      ...req.body,
      role: "User"
    },
  })
  return res.status(201).json(result)
}
