import Link from 'next/link'
import React from 'react'
import { Button } from 'reactstrap'
import ContractorMainForm from '../../components/ContractorMainForm'

export default function InscriptionEntrepreneur() {
    return (
        <div className="container pt-3 pb-5 rf-content">
            <Link href="/connexion-entrepreneur" style={{position:"absolute", right:"0", top:"5"}}>
                <Button outline color="warning" disabled style={{color:"black",position:"absolute", right:"21%"}}>Déjà inscrit? Connecte toi ici</Button>
            </Link>
            <br/>
            <br/>
            <h3>Remplissez ce formulaire pour vous inscrire et recevoir des projets</h3>
            <h5>Vous voulez des clients ? Sans engagement. Inscription gratuite</h5>
            <br/>
            <ContractorMainForm />
        </div>
    )
}