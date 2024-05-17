/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/backend_login',
            destination: 'http://localhost:5000/login',
          },
          {
              source: '/backend_signup',
              destination: 'http://localhost:5000/signup',
            },
        ]
      },
};


export default nextConfig;
