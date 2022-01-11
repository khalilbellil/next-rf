import React from 'react'
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap'
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
                zip: e.target[3].value,
                address: e.target[4].value,
                description: e.target[5].value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                router.push('/confirmation-de-devis').then(() => window.scrollTo(0, 0))
            }else{
                alert('Une erreur est survenue, merci de nous contactez directement.')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    return (
        <Form onSubmit={handleSubmit} method="POST" className="p-3" style={{border:'2px solid black', borderRadius:'10px'}}>
            <FormGroup>
                <Label for="name">Votre nom <b style={{color:"#ED5B0F"}}>*</b></Label>
                <Input name="name" required 
                onInvalid={(e) => e.currentTarget.setCustomValidity('Champ requis')} onInput={(e) => e.currentTarget.setCustomValidity('')} disabled/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Votre courriel <b style={{color:"#ED5B0F"}}>*</b></Label>
                <Input name="email" type="email" required 
                onInvalid={(e) => e.currentTarget.setCustomValidity('Champ requis ou courriel non valide')} onInput={(e) => e.currentTarget.setCustomValidity('')} disabled/>
                <FormFeedback>Ceci n'est pas un courriel valide !</FormFeedback>
                <FormText>jean@exemple.fr</FormText>
            </FormGroup>
            <FormGroup>
                <Label for="phone">Votre numéro de téléphone <b style={{color:"#ED5B0F"}}>*</b></Label>
                <Input name="phone" type="number" required 
                onInvalid={(e) => e.currentTarget.setCustomValidity('Champ requis')} onInput={(e) => e.currentTarget.setCustomValidity('')} disabled/>
                <FormFeedback>Numéro invalide !</FormFeedback>
            </FormGroup>
            <FormGroup className="row">
                <div className="col">
                    <Label for="zip">Code postal <b style={{color:"#ED5B0F"}}>*</b></Label>
                    <Input name="zip" type="number" required 
                    onInvalid={(e) => e.currentTarget.setCustomValidity('Champ requis')} onInput={(e) => e.currentTarget.setCustomValidity('')} disabled/>
                    <FormText>On en a besoin pour vous trouver des entrepreneurs de votre région</FormText>
                </div>
                <div className="col">
                <Label for="address">Adresse</Label>
                    <Input name="address" disabled/>
                </div>
            </FormGroup>
            <FormGroup>
                <Label for="description">Description de votre projet <b style={{color:"#ED5B0F"}}>*</b></Label>
                <Input name="description" type="textarea" required 
                onInvalid={(e) => e.currentTarget.setCustomValidity('Champ requis')} onInput={(e) => e.currentTarget.setCustomValidity('')} disabled/>
                <FormText>Exemple: Je voudrais refaire ma salle de bain au complet.</FormText>
            </FormGroup>
            <b style={{color:"#ED5B0F"}}>*</b><i style={{fontSize: "12px"}}> Champs requis</i>
            <br/>
            <br/>
            <Button className="rf-btn col" type="submit" style={{color: "white"}} disabled>Recevoir un devis</Button>
        </Form>
    )
}