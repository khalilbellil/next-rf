import React from 'react'
import { Button } from 'reactstrap'
import { useRouter } from 'next/router'

export default function Dashboard() {
    const router = useRouter()
    return (<div className='col'>
        <div className='row'>
            <Button className="col-3">Gestion Clients</Button>
            <Button className="col-3">Gestion Entrepreneurs</Button>
            <Button className="col-3" onClick={()=>router.push('/intranet/gestion-inscriptions-entrepreneurs').then(() => window.scrollTo(0, 0))}>Gestion Inscriptions Entrepreneurs</Button>
            <Button className="col-3">Gestion Potentielles Entrepreneurs</Button>
        </div>
    </div>)
}
