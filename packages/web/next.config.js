/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
    }
}

module.exports = nextConfig
