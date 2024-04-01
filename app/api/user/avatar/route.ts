import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

export async function POST(req : any) {
  const formData = await req.formData();
  if (formData.has('avatar')) {
    const file = formData.get('avatar');
    console.log(file);
    const s3Client = new S3Client({
      region: 'ap-south-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY ?? "",
        secretAccessKey: process.env.S3_ACCESS_KEY_SECRET ?? "",
      },
    });
    const email = formData.get('user');
    const ext = 'png';
    const newFilename = email + '.' + ext;
    const bucketName = process.env.BUCKET_NAME;

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }

    await s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: newFilename,
      ACL: 'public-read',
      Body: Buffer.concat(chunks),
      ContentType: file.type,
    }));

    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;

    return Response.json(link);
  }
}