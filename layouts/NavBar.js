import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { slide as Menu } from "react-burger-menu";
import { Button, Row } from 'reactstrap';

const navBarStyle = {
    color: "white"
};

export default function NavBar() {
    const closeMenu = () => {
        document.getElementById('bm-burger-button').style.transform = "translate3d(100%, 0px, 0px)";
        document.getElementById('bm-burger-button').setAttribute('aria-hidden', 'true');
    } 

    return (
    <div className="navbar col" style={navBarStyle}>
        <Row className="desktop-menu">
            <Link className="col" href="/">
                <a className="pr-3">Accueil</a>
            </Link>
            <Link className="col" href="/faq">
                <a className="pr-3">FAQ</a>
            </Link>
            <Link className="col" href="/a-propos">
                <a className="pr-3">À propos</a>
            </Link>
            <Link className="col" href="/demande-de-soumission">
                <Button outline color="warning" style={{color:"white"}}>Vous cherchez un entrepreneur?</Button>
            </Link>
            <Link className="col" href="/inscription-entrepreneur">
                <Button className="ml-2" outline color="warning" style={{color:"black"}}>Vous êtes un entrepreneur?</Button>
            </Link>
        </Row>
        <Menu noOverlay right pageWrapId={"page-wrap"} outerContainerId={"App"} className="mobile-menu" id="bm-burger-button">
            <Link href="/">
                <a className="row menu-item" onClick={() => closeMenu()}>Accueil</a>
            </Link><br/>
            <Link href="/faq">
                <a className="row menu-item" onClick={() => closeMenu()}>FAQ</a>
            </Link><br/>
            <Link href="/a-propos">
                <a className="row menu-item" onClick={() => closeMenu()}>À propos</a>
            </Link>
            <br/>
            <br/>
            <Link href="/demande-de-soumission">
                <Button outline color="warning" style={{color:"white"}} onClick={() => closeMenu()}>Vous cherchez un entrepreneur?</Button>
            </Link>
            <br/>
            <br/>
            <Link href="/inscription-entrepreneur">
                <Button outline color="warning" style={{color:"black"}} onClick={() => closeMenu()}>Vous êtes un entrepreneur?</Button>
            </Link>
        </Menu>
    </div>
    )
}
