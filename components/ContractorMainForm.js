import React from 'react'
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap'

export default function ContractorMainForm() {
    const handleSubmit = (e) => {
        e.preventDefault()
        alert("a")
    }
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="name">Votre nom*</Label>
                <Input name="name" required/>
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
                <Label for="company_name">Nom de votre entreprise*</Label>
                <Input name="company_name" required/>
                <FormText>Exemple: Entre 10 000 et 20 000 dinars</FormText>
            </FormGroup>
            <br/>
            <Button className="rf-btn pl-5 pr-5 col" type="submit" style={{color: "white"}}>S'inscrire en tant qu'entrepreneur</Button>
        </Form>
    )
}
