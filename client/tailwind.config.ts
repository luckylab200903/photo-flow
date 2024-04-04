import type { Config } from "tailwindcss";

const config = {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#c2506e",
        muted: "#fb88bb",
        overlay: "#ffe0e8",
        light: "#ffffff",
        dark: "#000000",
        gray: "#eee",
      },
    },
  },
  width: {
    '35': '35%', 
  },
} satisfies Config;

export default config;
// module.exports = {
//   async rewrites() {
//       return [
//         {
//           source: '/api/:path*',
//           destination: 'http://localhost:.example.com/:path*',
//         },
//       ]
//     },
// };