/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  images: {
    domains: ["crm-stageapi.pacificabs.com", "api.franchoiceworld.com"],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false
      }
    ]
  },
  reactStrictMode: false,
}

module.exports = nextConfig;
