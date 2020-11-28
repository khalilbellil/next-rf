import React from 'react'
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap'

export default function IntranetMainForm() {
    const handleSubmit = (e) => {
        e.preventDefault()
        alert("a")
    }
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="lastName">Votre nom*</Label>
                <Input name="lastName" required/>
            </FormGroup>
            <FormGroup>
                <Label for="firstName">Votre prenom*</Label>
                <Input name="firstName" required/>
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
