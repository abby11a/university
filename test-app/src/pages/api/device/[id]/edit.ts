
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return handleUPDATE(req, res)
}


// UPDATE /api/device/:id
async function handleUPDATE(req: NextApiRequest, res: NextApiResponse<any>) {
	const post = await prisma.device.update({
		where: { id: req.body.id },
        data: req.body.data
	});
	return res.json(post);
}

