/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'wfkxjtdfnpvfbfrdhsfw.supabase.co',
            pathname: '/storage/v1/object/public/images/**', 
          },
        ],
      },
}

module.exports = nextConfig
