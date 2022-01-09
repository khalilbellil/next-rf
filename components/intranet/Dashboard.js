import React from 'react'
import { Button } from 'reactstrap'
import { useRouter } from 'next/router'

export default function Dashboard() {
    const router = useRouter()
    return (<div className='col'>
        <div className='row widgets-row'>
            <div className="col-md-3"><Button onClick={()=>router.push('/intranet/gestion-clients').then(() => window.scrollTo(0, 0))}>Gestion Clients</Button></div>
            <div className="col-md-3"><Button onClick={()=>router.push('/intranet/gestion-entrepreneurs').then(() => window.scrollTo(0, 0))}>Gestion Entrepreneurs</Button></div>
            <div className="col-md-3"><Button onClick={()=>router.push('/intranet/gestion-inscriptions-entrepreneurs').then(() => window.scrollTo(0, 0))}>
                Gestion Inscriptions Entrepreneurs</Button></div>
            <div className="col-md-3"><Button disabled>Gestion Potentielles Entrepreneurs</Button></div>
        </div>
    </div>)
}