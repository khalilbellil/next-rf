import React,{ useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Footer from './Footer';
import Header from "./Header";
import ExtranetHeader from './extranet/ExtranetHeader';
import IntranetHeader from './intranet/IntranetHeader';
import ExtranetFooter from './extranet/ExtranetFooter';
import IntranetFooter from './intranet/IntranetFooter';
import Head from 'next/head';

export default function Layout(props) {
    const router = useRouter()
    const [layout, setLayout] = useState('')
    useEffect(() => {
        var path = router.pathname
        if(path.includes('intranet')){
            setLayout('intranet')
        }else if (path.includes('extranet')){
            setLayout('extranet')
        }else{
            setLayout('')
        }
    }, [router.pathname])
    return (
        <div className="layout" id="App">
            <Head>
                <script src="https://kit.fontawesome.com/fe809503a2.js" crossOrigin="anonymous"></script>
            </Head>
            {(layout === '')?<Header/>:(layout === 'extranet')?<ExtranetHeader/>:(layout === 'intranet')?<IntranetHeader/>:""}
            <div className="content" id="page-wrap">
                {props.children}
            </div>
            {(layout === '')?<Footer/>:(layout === 'extranet')?<ExtranetFooter/>:(layout === 'intranet')?<IntranetFooter/>:""}
        </div>
    )
}