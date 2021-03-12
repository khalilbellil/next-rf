import React from 'react'
import { useState, useEffect } from 'react'
import Login from '../../components/Login'

export default function tableauDeBord() {
    const [idUser, setIdUser] = useState('')
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIdUser(localStorage.getItem('id_user'))
        }
        if(idUser){
            alert(idUser)
        }
    }, [])
    return (idUser)?(
        <div>
            <h3>Tableau de bord extranet ({idUser})</h3>
            {/* <Dashboard/> */}
        </div>
    ):(
        <>
        <br/>
        <h3>Connectez-vous</h3>
        <br/>
        <Login/>
        </>
    )
}
