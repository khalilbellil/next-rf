import Link from 'next/link'
import React from 'react'
import { Button } from 'reactstrap'
// import IntranetMainForm from '../../components/IntranetMainForm'

export default function InscriptionInterne() {
    return (
        <div className="container pt-3 pb-5 rf-content">
            <Link href="/connexion/interne" style={{position:"absolute", right:"0", top:"5"}}>
                <Button outline color="warning" style={{color:"black",position:"absolute", right:"21%"}}>Déjà inscrit? Connecte toi ici</Button>
            </Link>
            <br/>
            <br/>
            <h3>Inscription intranet</h3>
            <br/>
            {/* <IntranetMainForm /> */}
        </div>
    )
}
