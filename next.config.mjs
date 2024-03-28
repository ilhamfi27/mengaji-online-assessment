/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async function () {
    return [
      {
        source: '/',
        destination: '/dashboard',
      },
    ];
  },
};

export default nextConfig;
