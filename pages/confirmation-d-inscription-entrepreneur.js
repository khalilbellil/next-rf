import React from 'react'

export default function ConfirmationDInscriptionEntrepreneur() {
    return (
        <div className="container pt-4 pb-5 rf-content">
            <div className="row">
                <div className="col-md-6">
                    <img src="/visitor/banniere_nous-avons-bien-recu-votre-demande.svg" alt="Confirmation"/>
                </div>
                <div className="col-md-6">
                    <h4 className="text-center">Merci pour votre confiance !</h4>
                    <br/>
                    <h5 className="text-center">Nous allons vous contacter dans les plus brefs délais afin de confirmer votre inscription et vous donnez accès aux projets de nos clients.</h5>
                    <br/><br/><br/>
                    <i style={{fontSize:"15px"}}>* Le délai d'attente moyen est de 24 à 72 heures.</i>
                </div>
            </div>
        </div>
    )
}