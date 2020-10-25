import React from 'react'
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap'

export default function DemandeDeSoumission() {
    return (
        <div className="container pt-5 pb-5">
            <h3>Remplissez ce formulaire pour qu'un entrepreneur qualifié vous appelle</h3>
            <br/>
            <Form>
                <FormGroup>
                    <Label for="name">Votre nom</Label>
                    <Input name="name"/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Votre courriel</Label>
                    <Input name="email" type="email"/>
                    <FormFeedback invalid>Ceci n'est pas un courriel valide !</FormFeedback>
                    <FormText>Exemple: hamza@exemple.dz</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Votre numéro de téléphone</Label>
                    <Input name="phone" type="phone"/>
                    <FormFeedback invalid>Numéro invalide !</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Adresse</Label>
                    <Input name="address"/>
                    <FormFeedback tooltip>You will not be able to see this</FormFeedback>
                    <FormText>L'adresse du lieu où auront lieu les travaux</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description de votre projet</Label>
                    <Input name="description" type="textarea"/>
                    <FormText>Exemple: Je voudrais refaire ma salle de bain au complet.</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="budget">Votre budget approximatif</Label>
                    <Input name="budget"/>
                    <FormText>Exemple: Entre 10 000 et 20 000 dinars</FormText>
                </FormGroup>
                <Button className="rf-btn" type="submit">Valider</Button>
            </Form>
        </div>
    )
}
