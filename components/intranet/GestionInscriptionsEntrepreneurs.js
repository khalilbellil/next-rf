import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Card, CardHeader, CardBody, FormGroup, Input, Label, Table } from 'reactstrap'

export default function GestionInscriptionsEntrepreneurs({ citiesD }) {
    const [contractor, setContractor] = useState(undefined)
    const [rappelerColor, setRappelerColor] = useState('secondary')
    const [pasInteresseColor, setPasInteresseColor] = useState('secondary')
    const [verifiedColor, setVerifiedColor] = useState('secondary')
    const [refusedColor, setRefusedColor] = useState('secondary')
    const [callbackdateUI, setCallbackdateUI] = useState(true)
    const [history, setHistory] = useState(undefined)
    const [initData, setInitData] = useState(undefined)
    const [cities, setCities] = useState(citiesD)

    useEffect(() => {
        getInitData()
        getNext()
    }, [])
    const getInitData = () => {
        fetch('/api/intranet/gestion-inscriptions-entrepreneurs/get-init-data', {
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
            setInitData({
                departments: res.departments,
                regions: res.regions,
                cities: res.cities
            })
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const resetUI = () => {
        setContractor(undefined)
        setRappelerColor('secondary')
        setPasInteresseColor('secondary')
        setVerifiedColor('secondary')
        setRefusedColor('secondary')
        setCallbackdateUI(false)
    }
    const getNext = () => {
        resetUI()
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
                setHistory(res.history)
            }else{
                alert('Vous avez traiter toutes les fiches disponible actuellement. Merci')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const saveStatus = (status, callbackdate = '') => {
        fetch('/api/intranet/gestion-inscriptions-entrepreneurs/save-status', {
            method: 'POST',
            body: JSON.stringify({
                id_user: localStorage.getItem('id_user'),
                id_contractor: contractor.id,
                status: status,
                callbacklater: callbackdate
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                getHistory()
                if(status === 'callbacklater'){
                    setRappelerColor('primary')
                    setPasInteresseColor('secondary')
                    setVerifiedColor('secondary')
                    setRefusedColor('secondary')
                }else if(status === 'notinterested'){
                    setPasInteresseColor('primary')
                    setRappelerColor('secondary')
                    setVerifiedColor('secondary')
                    setRefusedColor('secondary')
                }else if(status === 'verified'){
                    setVerifiedColor('primary')
                    setPasInteresseColor('secondary')
                    setRappelerColor('secondary')
                    setRefusedColor('secondary')
                }else if(status === 'refused'){
                    setRefusedColor('primary')
                    setVerifiedColor('secondary')
                    setPasInteresseColor('secondary')
                    setRappelerColor('secondary')
                }
            }else{
                alert('Erreur !')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const saveField = (target) => {
        fetch('/api/intranet/gestion-inscriptions-entrepreneurs/save-field', {
            method: 'POST',
            body: JSON.stringify({
                id_user: localStorage.getItem('id_user'),
                id_contractor: contractor.id,
                one: target.name,
                one_val: target.value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                //saved
                target.style.border = 'solid 2px green'
                setInterval(() => {
                    target.style.border = ''
                }, 1500);
            }else{
                target.style.border = 'solid 2px red'
                alert('ERREUR lors de la sauvegarde !')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const getHistory = () => {
        fetch('/api/intranet/get-contractor-history', {
            method: 'POST',
            body: JSON.stringify({
                id_user: localStorage.getItem('id_user'),
                id_contractor: contractor.id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            setHistory(res.history)
        })
        .catch(err => console.log("ERROR: ", err))
    }
    return (<>
    <div className="row pl-5 pr-5 mb-3">
        <div className="col">
            {
                (callbackdateUI)?(<div className="row">
                    <Input className="col" type='date' onChange={(e) => {saveStatus('callbacklater', e.target.value)}} />
                </div>):''
            }
        </div>
        <div className="col-8">
            <div className="row pl-5 pr-5">
                <ButtonGroup className="mr-2">
                    <Button className="col" color={rappelerColor} onClick={(e) => setCallbackdateUI(true)}>Rappeler plus tard <i class="fas fa-clock"></i></Button>
                    <Button className="col" color={pasInteresseColor} onClick={(e) => saveStatus('notinterested')}>Pas intéressé <i class="fas fa-comment-slash"></i></Button>
                    <Button className="col" color={refusedColor} onClick={(e) => saveStatus('refused')}>Refuser <i class="fas fa-times-circle"></i></Button>
                    <Button className="col " color={verifiedColor} onClick={(e) => saveStatus('verified')}>Valider <i class="fas fa-check-circle"></i></Button>
                </ButtonGroup>
                <Button className="col btn-primary-intranet" color="primary" onClick={(e) => getNext()}>Fiche suivante <i class="fas fa-chevron-circle-right"></i></Button>
            </div>
        </div>
        <div className="col">

        </div>
    </div>
    <div className="row">
        <div className="col-3 rf-card">
            <Card>
                <CardHeader className="text-center" tag="h4">Historique</CardHeader>
                <CardBody className="p-0">
                    <Table>
                        <thead>
                            <tr>
                            <th>Date</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            (history)?history.map(function(item, i){
                                return <tr>
                                    <th scope="row">{item.c_date}</th>
                                    <td>{item.name}</td>
                                </tr>
                            }):""
                        } 
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
        <div className="col-6 rf-card">
            <Card>
                <CardHeader className="text-center" tag="h4">Fiche entrepreneur</CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label for="name">Nom <b style={{color:"#ED5B0F"}}>*</b></Label>
                        <Input name="name" disabled={(!contractor)} value={(contractor)?contractor?.name:""} 
                        onChange={(e) => setContractor({...contractor, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Courriel <b style={{color:"#ED5B0F"}}>*</b></Label>
                        <Input name="email" disabled={(!contractor)} value={(contractor)?contractor?.email:""} 
                        onChange={(e) => setContractor({...contractor, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className='col'>
                            <Label for="phone">Téléphone <b style={{color:"#ED5B0F"}}>*</b></Label>
                            <Input name="phone" type="text" disabled={(!contractor)} value={(contractor)?contractor?.phone:""} 
                            onChange={(e) => setContractor({...contractor, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                        </div>
                        <div className='col'>
                            <Label for="phone2">Téléphone 2</Label>
                            <Input name="phone2" type="text" disabled={(!contractor)} value={(contractor)?contractor?.phone2:""} 
                            onChange={(e) => setContractor({...contractor, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className='col'>
                            <Label for="company_name">Nom de l'entreprise <b style={{color:"#ED5B0F"}}>*</b></Label>
                            <Input name="company_name" type="text" disabled={(!contractor)} value={(contractor)?contractor?.company_name:""} 
                            onChange={(e) => setContractor({...contractor, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                        </div>
                        <div className='col-5'>
                            <Label for="company_number">Numero d'entreprise</Label>
                            <Input name="company_number" disabled={(!contractor)} value={(contractor)?contractor?.company_number:""} 
                            onChange={(e) => setContractor({...contractor, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className='col-4'>
                            <Label for="zip">Code Postal <b style={{color:"#ED5B0F"}}>*</b></Label>
                            <Input name="zip" type="text" disabled={(!contractor)} value={(contractor)?contractor?.zip:""} 
                            onChange={(e) => setContractor({...contractor, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                        </div>
                        <div className='col'>
                            <Label for="id_department">Département <b style={{color:"#ED5B0F"}}>*</b></Label>
                            <Input name="id_department" type='select' value={(contractor)?contractor?.id_department:""} disabled={(!contractor)} 
                            onChange={(e) => setContractor({...contractor, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}>
                            {
                                (initData)?initData.departments.map(function(item, i){
                                    return <option value={item.id}>{item.name}</option>
                                }):""
                            } 
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className='col-4'>
                            <Label for="id_city">Ville <b style={{color:"#ED5B0F"}}>*</b></Label>
                            <Input name="id_city" type='select' value={(contractor)?contractor?.id_city:""} disabled={(!contractor)} 
                            onChange={(e) => setContractor({...contractor, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}>
                            {
                                (cities)?cities.map(function(item, i){
                                    return <option value={item.id}>{item.name}</option>
                                }):""
                            } 
                            </Input>
                        </div>
                        <div className='col'>
                            <Label for="id_region">Région <b style={{color:"#ED5B0F"}}>*</b></Label>
                            <Input name="id_region" type='select' value={(contractor)?contractor?.id_region:""} disabled={(!contractor)} 
                            onChange={(e) => setContractor({...contractor, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}>
                            {
                                (initData)?initData.regions.map(function(item, i){
                                    return <option value={item.id}>{item.name}</option>
                                }):""
                            } 
                            </Input>
                        </div>
                        
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Adresse</Label>
                        <Input name="address" type="text" disabled={(!contractor)} value={(contractor)?contractor?.address:""} 
                        onChange={(e) => setContractor({...contractor, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
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