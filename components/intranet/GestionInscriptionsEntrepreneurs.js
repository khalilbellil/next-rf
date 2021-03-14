import React, { useState } from 'react'
import { Button, ButtonGroup, Card, CardHeader, CardBody, FormGroup, Input, Label } from 'reactstrap'

export default function GestionInscriptionsEntrepreneurs() {
    const [uidContractor, setUidContractor] = useState('')
    const saveStatus = (status) => {
        fetch('/api/intranet/gestion-inscriptions-entrepreneurs/save-status', {
            method: 'POST',
            body: JSON.stringify({
                uid_contractor: uidContractor,
                status: status
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                alert('Saved')
            }else{
                alert('Erreur !')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    return (<>
    <div className="row pl-5 pr-5 mb-3">
        <div className="col">

        </div>
        <div className="col-6">
            <div className="row pl-5 pr-5">
                <ButtonGroup className="mr-2">
                    <Button className="col">Rappeler plus tard</Button>
                    <Button className="col">Pas interessé</Button>
                    <Button className="col">Valider</Button>
                </ButtonGroup>
                <Button className="col" color="primary">Fiche suivante</Button>
            </div>
        </div>
        <div className="col">

        </div>
    </div>
    <div className="row">
        <div className="col-3 rf-card">
            <Card>
                <CardHeader className="text-center" tag="h4">Historique</CardHeader>
                <CardBody>
                </CardBody>
            </Card>
        </div>
        <div className="col-6 rf-card">
            <Card>
                <CardHeader className="text-center" tag="h4">Fiche entrepreneur</CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label for="name">Nom</Label>
                        <Input name="name" disabled={(!uidContractor)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Courriel</Label>
                        <Input name="email" disabled={(!uidContractor)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Téléphone</Label>
                        <Input name="phone" type="text" disabled={(!uidContractor)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone2">Téléphone 2</Label>
                        <Input name="phone2" type="text" disabled={(!uidContractor)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="company">Nom de l'entreprise</Label>
                        <Input name="company" type="text" disabled={(!uidContractor)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">Ville</Label>
                        <Input name="city" disabled={(!uidContractor)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="company_number">Numero d'entreprise</Label>
                        <Input name="company_number" disabled={(!uidContractor)}/>
                    </FormGroup>
                </CardBody>
            </Card>
        </div>
        <div className="col-3 rf-card">
            <Card>
                <CardHeader className="text-center" tag="h4">Paramètres</CardHeader>
                <CardBody>
                </CardBody>
            </Card>
        </div>
    </div>
    </>)
}
