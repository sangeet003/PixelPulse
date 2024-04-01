/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: ''
          },
          {
            hostname: 'pixelpulse.s3.amazonaws.com',
          }
        ]
      }
};

export default nextConfig;
