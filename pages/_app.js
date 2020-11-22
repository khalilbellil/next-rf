import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/main.css"
import Layout from '../layouts/Layout'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps, initLayout }) {
    return <Provider session={pageProps.session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
}
export default MyApp