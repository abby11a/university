import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).send({ message: 'Only POST requests allowed' });
        }

        const { email, password } = req.body;

        // Find the user by email and password directly
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password, // Direct comparison, assuming plaintext storage (not recommended)
            },
        });

        if (!user) {
            // General error message for security
            return res.status(404).send({ message: 'User does not exist or password incorrect' });
        } else {
            const { password, ...userWithoutPassword } = user;
            return res.status(200).json(userWithoutPassword);
        }
        
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).send({ message: 'An error occurred during login.' });
    }
};
