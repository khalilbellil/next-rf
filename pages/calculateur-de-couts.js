
import React from 'react'
import CalculateurDeCouts from '../components/CalculateurDeCouts'

export default function calculateurDeCouts() {
    
    return (
        <div className="container">
            <br/><br/><br/><br/><br/>
            <CalculateurDeCouts data={[4500, 7500, 9000]}/>
            <br/><br/><br/><br/><br/>
        </div>
    )
}