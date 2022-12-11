/** @type {import('next').NextConfig} */
/**
 * === reactStrictMode ===
 * If the value is true, then it will run the effect twice, this is only to figure out any 
 * hooks used in a wrong sense.
 * Check the reference following:
 * https://stackoverflow.com/questions/71735407/why-my-custom-hook-is-executed-twice-when-i-use-it-once
 * === End ===
 * 
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
