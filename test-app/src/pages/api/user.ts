import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name, email, password } = req.body;
  
  // Hash the password before storing it in the database
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "User",
      },
    });
    return res.status(201).json({ name, email, role: result.role });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Error creating user' });
  }
}
