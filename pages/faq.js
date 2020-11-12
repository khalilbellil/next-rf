import Link from 'next/link'
import React from 'react'

export default function Faq() {
    return (
        <div className="container pt-3 pb-5">
            <h2>Foire aux questions</h2>
            <br/>
            <h4>Je veux trouver un entrepreneur pour réaliser mes travaux, comment pouvez-vous m'aider ?</h4>
            <h5>En remplissant <Link className="col" href="/demande-de-soumission">ce formulaire</Link>, nous vous trouvons des entrepreneurs qualifiés de votre région dans les meilleurs délais possible.</h5>
            
        </div>
    )
}
