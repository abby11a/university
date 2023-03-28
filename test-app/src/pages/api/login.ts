import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// Searches user database to see if user exists with the username & password

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' });
            return;
        }
        console.log(req.body)
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
                password: req.body.password
            },
        })
        if (!user) {
            res.status(404).send({ message: 'User does not exist' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(405).send({ message: `{error.message}` });
        return;
    }
};

