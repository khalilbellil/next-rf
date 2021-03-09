import Link from 'next/link'
import React from 'react'

export default function Faq() {
    return (
        <div className="container pt-3 pb-5 rf-content">
            <h2>Foire aux questions</h2>
            <br/>
            <h4>Je veux trouver un entrepreneur pour réaliser mes travaux, comment pouvez-vous m'aider ?</h4>
            <h5>En remplissant <Link className="col" href="/demande-de-devis">ce formulaire</Link>, nous vous trouvons des entrepreneurs qualifiés de votre région dans les meilleurs délais possible.</h5>
            <h4>Qu'est-ce que RenovationFacile.fr ?</h4>
            <h5>Renovationfacile.fr est une plateforme de mise en relation entre les entrepreneurs en rénovation et les clients.</h5>
            <br/>
            <h4>Comment je reçoit mon devis ?</h4>
            <h5>Après avoir rempli le formulaire avec les détails sur votre projet de rénovation, un ou plusieurs entrepreneurs vous contacteront pour vous proposer un devis pour les travaux.</h5>
            <br/>
            <h4>Est-ce le service est gratuit ?</h4>
            <h5>Ce service (recevoir des devis) est totalement gratuit pour les clients.</h5>
            <br/>
            <h4>Comment puis-je m'assurer de la qualité des entrepreneurs ?</h4>
            <h5>Notre service qualité vérifie les antecedents, les licences nécessaires ainsi que l'historique de satisfaction de ses clients. Et nous nous assurons de vous envoyer des entrepreneurs de votre région, avec les qualités requises en fonction du projet.</h5>
            <br/>
        </div>
    )
}
