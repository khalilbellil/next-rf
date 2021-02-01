import React from 'react'
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

export default function MainForm() {
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/visitor/demande-de-soumission', {
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
                <Label for="name">Votre nom*</Label>
                <Input name="name" required/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Votre courriel*</Label>
                <Input name="email" type="email" required/>
                <FormFeedback>Ceci n'est pas un courriel valide !</FormFeedback>
                <FormText>Exemple: hamza@exemple.dz</FormText>
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
            {/* <Button className="rf-btn pl-5 pr-5 col" type="submit" style={{color: "white"}}>Recevoir une soumission</Button> */}
            <Popup trigger={<button className="rf-btn pl-5 pr-5 col" type="submit" style={{color: "white"}}>Recevoir une soumission</button>} position="right center">
                <div>Votre demande a bien été reçu. Nous allons vous mettre en relations avec des entrepreneurs qualifiés dans les meilleurs délais.</div>
            </Popup>
        </Form>
    )
}