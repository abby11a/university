
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return handleUPDATE(req, res)
}


// Edit device - /api/device/[id]/edit
async function handleUPDATE(req: NextApiRequest, res: NextApiResponse<any>) {
	const post = await prisma.device.update({
		where: { id: req.body.id },
        data: req.body.data
	});
	return res.json(post);
}

