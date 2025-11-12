import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', // Changes the build output directory to `./dist/`.
  experimental: {
    turbopackFileSystemCacheForDev: true
  }
}
 
export default withNextIntl(nextConfig)