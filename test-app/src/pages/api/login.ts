import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

/**  
 * POST /api/login
 * Required fields in body: email, password
 * Searches user database for entry, returns whether their credentials are correct
 * Used to log in a user
*/
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

