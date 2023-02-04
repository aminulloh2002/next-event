import fs from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import formidable from "formidable";
import parseWithFormidable from "helpers/formidable-utils";
import { insertIntoFirebase } from "helpers/api-util";
import { uploadImageToFirebase } from "helpers/firebase-util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const saveLocally = false;
    if (saveLocally) {
      try {
        await fs.readdir(path.join(process.cwd(), "/public", "/images"));
      } catch (error) {
        await fs.mkdir(path.join(process.cwd(), "/public", "/images"));
      }
    }
    const payload = await parseWithFormidable(req, saveLocally).then(
      async (data: { fields: formidable.Fields; files: formidable.Files }) => {
        const { fields, files } = data;

        const { image } = files;

        // @ts-ignore
        const src = image.filepath;
        const srcToFile = (src: string) =>
          fs.readFile(src).then((res) => {
            return res;
          });

        const file = await srcToFile(src);

        const firebasepath = await uploadImageToFirebase(
          file,
          // @ts-ignore
          image.newFilename
        );

        return {
          ...fields,
          isFeatured: true,
          image: firebasepath,
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
