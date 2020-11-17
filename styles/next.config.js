const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            /* development only config options here */
            env: {
                NEXTAUTH_URL = 'http://localhost:3000',
                GITHUB_ID = '788159c7f3be7a90b75a',
                GITHUB_SECRET = '50c732ca6442262538c543ccfa0c67ef4ab5865e'
            }
        }
    }

    return {
        /* config options for all phases except development here */
        env: {
            NEXTAUTH_URL = 'https://next-rf.vercel.app',
            GITHUB_ID = '788159c7f3be7a90b75a',
            GITHUB_SECRET = '50c732ca6442262538c543ccfa0c67ef4ab5865e'
        }
    }
}