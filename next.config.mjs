/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID
    }
};

export default nextConfig;
