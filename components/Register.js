import React from 'react'
import { Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap'
import 'reactjs-popup/dist/index.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Register(props) {
    const [repeatPasswordError, setRepeatPasswordError] = useState(false)
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(0)
    const router = useRouter()
    useEffect(() => {
        if(router.query.token){
            fetch('/api/auth/verify-token', {
                method: 'POST',
                body: JSON.stringify({
                    token: router.query.token
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res.success === 'yes'){
                    setRole(res.role)
                }else if(res.success === 'already'){
                    alert('Utilisateur déjà enregistré')
                }else{
                    alert('Inscription non disponible')
                }
            })
        }
    }, [router.query.token])
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                password: e.target[0].value,
                from: props.from,
                token: router.query.token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                localStorage.setItem('id_user', res.id_user)
                localStorage.setItem('role', role)
                if(role < 4 && role > 0){
                    router.push('/intranet/tableau-de-bord').then(() => window.scrollTo(0, 0))
                }else if(role == 4){
                    router.push('/extranet/tableau-de-bord').then(() => window.scrollTo(0, 0))
                }
                
            }else{
                alert('Une erreur est survenue, merci de nous contactez directement.')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const handleRepeatPasswordBlur = (e) => {
        if(e.target.value !== password){
            setRepeatPasswordError(true)
        }else{
            setRepeatPasswordError(false)
        }
    }
    return (role)? (
        <Form onSubmit={handleSubmit} method="POST" className="p-3" style={{border:'2px solid black', borderRadius:'10px'}}>
            <FormGroup>
                <Label for="password">Mot de passe</Label>
                <Input name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </FormGroup>
            <FormGroup className="position-relative">
                <Label for="password2">Confirmer le mot de passe</Label>
                <Input name="password2" type="password" required invalid={repeatPasswordError} onBlur={handleRepeatPasswordBlur}/>
                <FormFeedback tooltip>Il y a une erreur dans la confirmation du mot de passe</FormFeedback>
            </FormGroup>
            <br/>
            <br/>
            <Button className="rf-btn col" type="submit" style={{color: "white"}}>S'inscrire</Button>
        </Form>
    ):(<></>)
}