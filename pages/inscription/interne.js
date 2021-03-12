import Link from 'next/link'
import React from 'react'
import { Button } from 'reactstrap'
import Register from '../../components/Register'

export default function InscriptionInterne() {
    return (
        <div className="container pt-3 pb-5 rf-content">
            <br/>
            <h3 className="text-center">Inscription intranet</h3>
            <br/>
            <Register from='intranet'/>
        </div>
    )
}
