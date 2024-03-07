import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { getClientIp } from "request-ip";

const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(2, '10 s'),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const clientIp = getClientIp(req) || "NA";
    const { success } = await ratelimit.limit(clientIp);
 
    if (!success) {
        return res.status(429).send({ message: 'Rate succeeded' });
    }

    try {
        if (req.method !== 'POST') {
            return res.status(405).send({ message: 'Only POST requests allowed' });
        }

        const { email, password } = req.body;

        // Basic input validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the user by email
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user && bcrypt.compareSync(password, user.password)) {
            // Remove password and other sensitive fields before sending the user object
            const { password, ...userWithoutPassword } = user;
            return res.status(200).json(userWithoutPassword);
        } else {
            // If user is not found or password does not match
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).send({ message: 'An error occurred during login.' });
    }
};
