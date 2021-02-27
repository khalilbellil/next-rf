import React from 'react'
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { useRouter } from 'next/router'

export default function MainForm() {
    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/visitor/add-new-project', {
            method: 'POST',
            body: JSON.stringify({
                name: e.target[0].value,
                email: e.target[1].value,
                phone: e.target[2].value,
                address: e.target[3].value,
                city: e.target[4].value,
                description: e.target[5].value,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                router.push('/confirmation-de-soumission')
            }else{
                alert('Une erreur est survenue, merci de nous contactez directement.')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    return (
        <Form onSubmit={handleSubmit} method="POST" className="p-3" style={{border:'2px solid black', borderRadius:'10px'}}>
            <FormGroup>
                <Label for="name">Votre nom*</Label>
                <Input name="name" required/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Votre courriel*</Label>
                <Input name="email" type="email" required/>
                <FormFeedback>Ceci n'est pas un courriel valide !</FormFeedback>
                <FormText>jean@exemple.fr</FormText>
            </FormGroup>
            <FormGroup>
                <Label for="phone">Votre numéro de téléphone*</Label>
                <Input name="phone" type="phone" required/>
                <FormFeedback>Numéro invalide !</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="address">Adresse</Label>
                <Input name="address"/>
                <Label for="city">Ville</Label>
                <Input name="city"/>
                <FormText>L'adresse du lieu où auront lieu les travaux</FormText>
            </FormGroup>
            <FormGroup>
                <Label for="description">Description de votre projet*</Label>
                <Input name="description" type="textarea" required/>
                <FormText>Exemple: Je voudrais refaire ma salle de bain au complet.</FormText>
            </FormGroup>
            <br/>
            <Button className="rf-btn col" type="submit" style={{color: "white"}}>Recevoir une soumission</Button>
        </Form>
    )
}