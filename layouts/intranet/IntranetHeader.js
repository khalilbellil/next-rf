import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'reactstrap'

export default function IntranetHeader() {
    const [idUser, setIdUser] = useState('')
    const router = useRouter()
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIdUser(localStorage.getItem('id_user'))
        }
        if(!localStorage.getItem('id_user')){
            router.push('/connexion/interne').then(() => window.scrollTo(0, 0))
        }
    }, [])
    const Disconnect = (e) => {
        localStorage.clear()
        router.push('/').then(() => window.scrollTo(0, 0))
    }
    return (
        <div>
            INTRANET <Button onClick={Disconnect}>Deconnexion</Button>
        </div>
    )
}
