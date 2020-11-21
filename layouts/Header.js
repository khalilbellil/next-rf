import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import NavBar from './NavBar'
import { Button, Col, Row } from 'reactstrap'

const headerStyle = {
    color: "white",
    height: "80px",
    background: "rgb(221,121,71)",
    background: "linear-gradient(90deg, rgba(221,121,71,1) 0%, rgba(235,91,14,1) 35%, rgba(251,89,19,1) 75%, rgba(254,131,49,1) 100%)",
    borderBottom: "solid 2px black"
};

function Header() {
    return (
        <div className="col shadow fixed-top" style={headerStyle}>
            <div className="container">
                <Row>
                    <Col xs="4" className="pt-2">
                        <Link href="/">
                            <a style={{color: "black"}}><img src="rf_logo_1.png" height="60" alt="RenoFacile.dz"/></a>
                        </Link>
                    </Col>
                    <NavBar />
                </Row>
            </div>
        </div>
    )
}

export default Header
