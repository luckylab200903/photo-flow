const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Corrected hostname
        port: '',
        pathname: '/dtekkvnmz/**', // Adjust the pathname as per your requirement
      },
    ],
  },
};

export default nextConfig;
