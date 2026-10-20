import { ImageKit, toFile } from "@imagekit/nodejs";
const imagekit = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

export async function uploadFile({buffer}) {
   const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(buffer), "file"),
      fileName: "profile",
      folder: "profile_img",
    });

    return file
}
