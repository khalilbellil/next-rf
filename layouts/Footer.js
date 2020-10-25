import React from 'react'
import { Col, Row } from 'reactstrap'
import Link from 'next/link'

const footerStyle = {
    color: "white",
    width: "100%",
    height: "40px",
    position: "fixed",
    bottom: "0",
    background: "rgb(221,121,71)",
    background: "linear-gradient(90deg, rgba(221,121,71,1) 0%, rgba(235,91,14,1) 35%, rgba(251,89,19,1) 75%, rgba(254,131,49,1) 100%)",
    borderTop: "solid 2px black"
};

function Footer() {
    return (
        <div className="shadow-top" style={footerStyle}>
            <div className="container">
                <Row>
                    <Col xs="5" className="pt-2"><i style={{color: "black"}}>© 2020 RenoFacile.dz &nbsp;&nbsp;|&nbsp;&nbsp; La rénovation à porter de mains</i></Col>
                    <Col xs="4"></Col>
                    <Col className="pt-2"><Link className="col-3" href="/demande-de-soumission"><a style={{color:"white"}}>Recevoir une soumission</a></Link></Col>
                </Row>
            </div>
        </div>
    )
}

export default Footer
