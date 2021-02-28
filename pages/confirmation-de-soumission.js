import React from 'react'

export default function ConfirmationDeSoumission() {
    return (
        <div className="container pt-4 pb-5 rf-content">
            <div className="row">
                <div className="col-md-6">
                    <img src="/visitor/banniere_nous-avons-bien-recu-votre-demande.svg" alt="Confirmation"/>
                </div>
                <div className="col-md-6">
                    <h4 className="text-center">Merci pour votre confiance !</h4>
                    <br/>
                    <h5 className="text-center">Nous allons vous mettre en relation avec un à trois entrepreneur(s) 
                    qualifié(s) de votre région. Ils vous contacteront par courriel ou par téléphone afin de vous proposer une soumission 
                    pour vos travaux.</h5>
                    <br/><br/><br/>
                    <i style={{fontSize:"15px"}}>* Le délai d'attente moyen est de deux à trois jours ouvrables.</i>
                </div>
            </div>
        </div>
    )
}
