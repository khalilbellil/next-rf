import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/main.css"
import "../styles/intranet.css"
import Layout from '../layouts/Layout'

function MyApp({ Component, pageProps }) {
    return  <Layout>
                    <Component {...pageProps} />
            </Layout>
}
export default MyApp