/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // remotePatterns: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: ''
            }
        ],
    },
};

export default nextConfig;