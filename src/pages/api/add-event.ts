import fs from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import formidable from "formidable";
import parseWithFormidable from "helpers/formidable-utils";
import { insertIntoFirebase } from "helpers/api-util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await fs.readdir(path.join(process.cwd(), "/public", "/images"));
    } catch (error) {
      await fs.mkdir(path.join(process.cwd(), "/public", "/images"));
    }
    const payload = await parseWithFormidable(req, true).then(
      (data: { fields: formidable.Fields; files: formidable.Files }) => {
        const { fields, files } = data;

        const { image } = files;

        return {
          ...fields,
          // @ts-ignore
          image: "images/" + image.newFilename,
        };
      }
    );
    await insertIntoFirebase(payload);

    res.json({ done: "ok" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
