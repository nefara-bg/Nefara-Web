import createNextIntlPlugin from 'next-intl/plugin';
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', // Changes the build output directory to `./dist/`.
  experimental: {
    turbopackFileSystemCacheForDev: true
  },
  turbopack: {
    root: path.resolve(__dirname)
  }
}
 
export default withNextIntl(nextConfig)