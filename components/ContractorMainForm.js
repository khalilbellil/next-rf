import React from 'react'
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap'

export default function ContractorMainForm() {
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/visitor/contractor-inscription', {
            method: 'POST',
            body: JSON.stringify({
                name: e.target[0].value,
                email: e.target[1].value,
                phone: e.target[2].value,
                company_name: e.target[3].value,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .catch(err => console.log("ERROR: ", err))
    }
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="name">Votre nom*</Label>
                <Input name="name" required />
            </FormGroup>
            <FormGroup>
                <Label for="email">Votre courriel*</Label>
                <Input name="email" type="email" required />
                <FormFeedback invalid>Ceci n'est pas un courriel valide !</FormFeedback>
                <FormText>Exemple: hamza@exemple.dz</FormText>
            </FormGroup>
            <FormGroup>
                <Label for="phone">Votre numéro de téléphone*</Label>
                <Input name="phone" type="phone" required />
                <FormFeedback invalid>Numéro invalide !</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="company_name">Nom de votre entreprise*</Label>
                <Input name="company_name" required />
            </FormGroup>
            <br />
            <Button className="rf-btn pl-5 pr-5 col" type="submit" style={{ color: "white" }}>S'inscrire en tant qu'entrepreneur</Button>
        </Form>
    )
}
