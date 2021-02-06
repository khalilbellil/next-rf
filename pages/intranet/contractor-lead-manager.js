import React from 'react'
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

export default function contractorLeadManager() {
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/intranet/add-new-lead', {
            method: 'POST',
            body: JSON.stringify({
                name: e.target[0].value,
                company_name: e.target[1].value,
                email: e.target[2].value,
                phone: e.target[3].value,
                phone2: e.target[4].value,
                city: e.target[5].value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                alert('success')
            }else{
                alert('error')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    return (
        <Form onSubmit={handleSubmit} method="POST">
            <FormGroup>
                <Label for="name">Nom*</Label>
                <Input name="name" required/>
            </FormGroup>
            <FormGroup>
                <Label for="company_name">Nom de la société</Label>
                <Input name="company_name"/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input name="email" type="email"/>
                <FormFeedback>Ceci n'est pas un courriel valide !</FormFeedback>
                <FormText>Exemple: hamza@exemple.dz</FormText>
            </FormGroup>
            <FormGroup>
                <Label for="phone">Téléphone*</Label>
                <Input name="phone" type="phone" required/>
                <FormFeedback>Numéro invalide !</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="phone2">Téléphone 2</Label>
                <Input name="phone2" type="phone"/>
                <FormFeedback>Numéro invalide !</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="city">Ville</Label>
                <Input name="city"/>
            </FormGroup>
            <br/>
            {/* <Button className="rf-btn pl-5 pr-5 col" type="submit" style={{color: "white"}}>Recevoir une soumission</Button> */}
            <Popup trigger={<button className="rf-btn pl-5 pr-5 col" type="submit" style={{color: "white"}}>Enregistrer</button>} position="right center">
                <div>Sauvegarde réussie.</div>
            </Popup>
        </Form>
    )
}