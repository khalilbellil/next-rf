import React from 'react'
import Footer from './Footer';
import Header from "./Header";


export default function Layout(props) {
    return (
        <div className="layout" id="App">
            <Header />
            <div className="content" id="page-wrap">
                {props.children}
            </div>
            <Footer/>
        </div>
    )
}
