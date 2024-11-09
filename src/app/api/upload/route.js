import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const data = await req.formData();
  if (!data.get("file")) {
    return Response.json({ message: "File unavailable" }, { status: 500 });
  }
  // upload the file
  const file = data.get("file");
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "next-cloudinary-uploads" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });

  return Response.json(
    {
      publicId: result.public_id,
    },
    {
      status: 200,
    }
  );
}
