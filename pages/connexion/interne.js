import React from 'react'
import Login from '../../components/Login'

export default function ConnexionInterne() {
    return (
        <div className="rf-content p-5" style={{marginLeft:"25%", marginRight:"25%"}}>
            <h3 className="text-center">Espace administrateur</h3>
            <Login />
        </div>
    )
}