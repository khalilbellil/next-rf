import React, { useState } from 'react'
import { Button, ButtonGroup, Card, CardHeader, CardBody, FormGroup, Input, Label } from 'reactstrap'

export default function GestionInscriptionsEntrepreneurs() {
    const [contractor, setContractor] = useState(undefined)
    const [rappelerColor, setRappelerColor] = useState('secondary')
    const [pasInteresseColor, setPasInteresseColor] = useState('secondary')
    const [verifiedColor, setVerifiedColor] = useState('secondary')

    const getNext = () => {
        fetch('/api/intranet/gestion-inscriptions-entrepreneurs/get-next', {
            method: 'POST',
            body: JSON.stringify({
                id_user: localStorage.getItem('id_user')
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                setContractor(res.contractor)
            }else{
                alert('Erreur !')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const saveStatus = (status) => {
        fetch('/api/intranet/gestion-inscriptions-entrepreneurs/save-status', {
            method: 'POST',
            body: JSON.stringify({
                id_user: localStorage.getItem('id_user'),
                uid_contractor: contractor.id,
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
                if(status === 'callbacklater'){
                    setRappelerColor('primary')
                    setPasInteresseColor('secondary')
                    setVerifiedColor('secondary')
                }else if(status === 'notinterested'){
                    setPasInteresseColor('primary')
                    setRappelerColor('secondary')
                    setVerifiedColor('secondary')
                }else{
                    setVerifiedColor('primary')
                    setPasInteresseColor('secondary')
                    setRappelerColor('secondary')
                }
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
                    <Button className="col" color={rappelerColor} onClick={(e) => saveStatus('callbacklater')}>Rappeler plus tard</Button>
                    <Button className="col" color={pasInteresseColor} onClick={(e) => saveStatus('notinterested')}>Pas intéressé</Button>
                    <Button className="col" color={verifiedColor} onClick={(e) => saveStatus('verified')}>Valider</Button>
                </ButtonGroup>
                <Button className="col" color="primary" onClick={(e) => getNext()}>Fiche suivante</Button>
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
                        <Input name="name" disabled={(!contractor)} value={(contractor)?contractor?.name:""}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Courriel</Label>
                        <Input name="email" disabled={(!contractor)} value={(contractor)?contractor?.email:""}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Téléphone</Label>
                        <Input name="phone" type="text" disabled={(!contractor)} value={(contractor)?contractor?.phone:""}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone2">Téléphone 2</Label>
                        <Input name="phone2" type="text" disabled={(!contractor)} value={(contractor)?contractor?.phone2:""}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="company_name">Nom de l'entreprise</Label>
                        <Input name="company_name" type="text" disabled={(!contractor)} value={(contractor)?contractor?.company_name:""}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">Ville</Label>
                        <Input name="city" disabled={(!contractor)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="company_number">Numero d'entreprise</Label>
                        <Input name="company_number" disabled={(!contractor)} value={(contractor)?contractor?.company_number:""}/>
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
