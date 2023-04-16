
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return handleUPDATE(req, res)
}

/**  
 * /api/device/[id]/edit
 * Edits a device in the database
 * Searches for the device by its ID and updates it using the given data
 * Required in body: id, data
*/
async function handleUPDATE(req: NextApiRequest, res: NextApiResponse<any>) {
	const post = await prisma.device.update({
		where: { id: req.body.id },
        data: req.body.data
	});
	return res.json(post);
}

