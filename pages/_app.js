import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/main.css"
import Layout from '../layouts/Layout'

function MyApp({ Component, pageProps }) {
    return <Layout><br/><Component {...pageProps} /><br/></Layout>
}

export default MyApp