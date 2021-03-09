import React from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import 'reactjs-popup/dist/index.css'
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: e.target[0].value,
                password: e.target[1].value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                router.push('/intranet/tableau-de-bord').then(() => window.scrollTo(0, 0))
            }else{
                alert('Erreur, merci de verifier vos informations')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    return (
        <Form onSubmit={handleSubmit} method="POST" className="p-3" style={{border:'2px solid black', borderRadius:'10px'}}>
            <FormGroup>
                <Label for="username">Nom d'utilisateur</Label>
                <Input name="username" required/>
            </FormGroup>
            <FormGroup>
                <Label for="password">Mot de passe</Label>
                <Input name="password" type="password" required/>
            </FormGroup>
            <br/>
            <br/>
            <Button className="rf-btn col" type="submit" style={{color: "white"}}>Connexion</Button>
        </Form>
    )
}