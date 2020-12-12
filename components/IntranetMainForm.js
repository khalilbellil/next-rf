import React from 'react'
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap'

export default function IntranetMainForm() {
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/test')
        .then(response => response.json())
        .then(response => console.log("RESPONSE: ", response))
        .catch(err => console.log("ERROR: ", err))
    }
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="last_name">Votre nom*</Label>
                <Input name="last_name" required/>
            </FormGroup>
            <FormGroup>
                <Label for="first_name">Votre prenom*</Label>
                <Input name="first_name" required/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Votre courriel*</Label>
                <Input name="email" type="email" required/>
                <FormFeedback invalid>Ceci n'est pas un courriel valide !</FormFeedback>
                <FormText>Exemple: hamza@exemple.dz</FormText>
            </FormGroup>
            <FormGroup>
                <Label for="phone">Votre numéro de téléphone*</Label>
                <Input name="phone" type="phone" required/>
                <FormFeedback invalid>Numéro invalide !</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="password">Votre numéro de téléphone*</Label>
                <Input name="password" type="phone" required/>
                <FormFeedback invalid>Numéro invalide !</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="phone">Votre numéro de téléphone*</Label>
                <Input name="phone" type="phone" required/>
                <FormFeedback invalid>Numéro invalide !</FormFeedback>
            </FormGroup>
            <br/>
            <Button className="rf-btn pl-5 pr-5 col" type="submit" style={{color: "white"}}>S'inscrire en tant qu'employé</Button>
        </Form>
    )
}
