import React from 'react'
import { Col, Row } from 'reactstrap'
import Link from 'next/link'

const footerStyle = {
    color: "black",
    width: "100%",
    height: "50px",
    position: "relative",
    bottom: "0",
    background: "rgb(226,136,91)",
    background: "linear-gradient(90deg, rgba(226,136,91,1) 0%, rgba(233,177,113,1) 35%, rgba(230,168,92,1) 75%, rgba(254,131,49,1) 100%)",
    borderTop: "solid 2px black",
    marginTop: "-50px"
};

function Footer() {
    return (
        <div className="shadow-top footer" style={footerStyle}>
            <div className="container">
                <Row>
                    <Col xs="6" className="pt-2 col-xs-auto">
                        <i>© 2021 RenovationFacile.fr</i>
                    </Col>
                    <Col xs="6" className="pt-2 col-xs-auto" style={{textAlign:"right"}}>
                        <Link href="/demande-de-devis"><a style={{color:"black", paddingRight:"8px"}}>Recevoir un devis</a></Link>
                        <Link href="/politique-de-confidentialite"><a style={{color:"black", paddingRight:"8px"}}>Politique de confidentialité</a></Link>
                        <Link href="/conditions-generales"><a style={{color:"black"}}>Conditions générales</a></Link>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Footer
