import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/main.css"
import Layout from '../layouts/Layout'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

function MyApp({ Component, pageProps }) {
    return  <Layout>
                    <Component {...pageProps} />
            </Layout>
}
export default MyApp