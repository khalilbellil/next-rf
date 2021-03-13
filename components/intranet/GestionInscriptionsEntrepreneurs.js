import React from 'react'
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap'
import Popup from 'reactjs-popup'

export default function GestioInscriptionsEntrepreneurs() {
    
    return (<>
        <div className="col-3"></div>
        <div className="col-6">
            <Form className="p-5">
                <FormGroup>
                    <Label for="name">Nom</Label>
                    <Input name="name"/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Courriel</Label>
                    <Input name="email"/>
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Téléphone</Label>
                    <Input name="phone" type="text"/>
                </FormGroup>
                <FormGroup>
                    <Label for="phone2">Téléphone 2</Label>
                    <Input name="phone2" type="text"/>
                </FormGroup>
                <FormGroup>
                    <Label for="company">Nom de l'entreprise</Label>
                    <Input name="company" type="text"/>
                </FormGroup>
                <FormGroup>
                    <Label for="city">Ville</Label>
                    <Input name="city"/>
                </FormGroup>
            </Form>
        </div>
        <div className="col-3"></div>
    </>)
}
