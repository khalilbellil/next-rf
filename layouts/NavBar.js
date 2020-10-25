import React from 'react'
import { Row } from 'reactstrap'
import Link from 'next/link'

const navBarStyle = {
    color: "white"
};

export default function NavBar() {
    return (
        <div className="navbar" style={navBarStyle}>
            <Row>
                    <Link className="col-3" href="/">
                        <a className="pr-5">Accueil</a>
                    </Link>
                    <Link className="col-3" href="/demande-de-soumission">
                        <a className="pr-5">Trouver un entrepreneur</a>
                    </Link>
                    <Link className="col-3" href="/faq">
                        <a className="pr-5">FAQ</a>
                    </Link>
                    <Link className="col-3" href="/a-propos">
                        <a className="pr-5">À propos</a>
                    </Link>
                    <Link className="col-3" href="/contact">
                        <a className="pr-5">Contact</a>
                    </Link>
            </Row>
        </div>
    )
}
