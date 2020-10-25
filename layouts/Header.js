import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import NavBar from './NavBar'
import { Col, Row } from 'reactstrap'

const headerStyle = {
    color: "white",
    height: "50px",
    background: "rgb(221,121,71)",
    background: "linear-gradient(90deg, rgba(221,121,71,1) 0%, rgba(235,91,14,1) 35%, rgba(251,89,19,1) 75%, rgba(254,131,49,1) 100%)",
    borderBottom: "solid 2px black"
};

function Header() {
    return (
    <div>
        <Head>
            <title>RenoFacile.dz</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="col shadow" style={headerStyle}>
            <div className="container">
                <Row>
                    <Col xs="5" className="pt-2">
                        <Link href="/">
                            <a style={{color: "black"}}><b>RenoFacile.dz</b></a>
                        </Link>
                    </Col>
                    <Col>
                        <NavBar />
                    </Col>
                </Row>
            </div>
        </div>
    </div>
    )
}

export default Header
