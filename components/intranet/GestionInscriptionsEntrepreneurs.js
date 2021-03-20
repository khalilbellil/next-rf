import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Card, CardHeader, CardBody, FormGroup, Input, Label, Table } from 'reactstrap'
import VirtualizedSelect from 'react-virtualized-select';
import Select from 'react-select';
import InfiniteScroll from "react-infinite-scroll-component";
import AsyncSelect from 'react-select/async';

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
    const [actualCity, setActualCity] = useState({})
    const [actualDepartment, setActualDepartment] = useState(undefined)
    const defaultCities = [
        {"value":1,"department_code":"01","insee_code":"01001","zip_code":"01400","label":"L'Abergement-Cl\u00e9menciat","slug":"l abergement clemenciat","gps_lat":46.15678199203189,"gps_lng":4.92469920318725},{"value":2,"department_code":"01","insee_code":"01002","zip_code":"01640","label":"L'Abergement-de-Varey","slug":"l abergement de varey","gps_lat":46.01008562499999,"gps_lng":5.42875916666667},{"value":3,"department_code":"01","insee_code":"01004","zip_code":"01500","label":"Amb\u00e9rieu-en-Bugey","slug":"amberieu en bugey","gps_lat":45.95840939226519,"gps_lng":5.3759920441989},{"value":4,"department_code":"01","insee_code":"01005","zip_code":"01330","label":"Amb\u00e9rieux-en-Dombes","slug":"amberieux en dombes","gps_lat":46.00012039215686,"gps_lng":4.9106016993464},{"value":5,"department_code":"01","insee_code":"01006","zip_code":"01300","label":"Ambl\u00e9on","slug":"ambleon","gps_lat":45.74642690476188,"gps_lng":5.60249178571429},{"value":6,"department_code":"01","insee_code":"01007","zip_code":"01500","label":"Ambronay","slug":"ambronay","gps_lat":46.00144716049382,"gps_lng":5.36654228395062},{"value":7,"department_code":"01","insee_code":"01008","zip_code":"01500","label":"Ambutrix","slug":"ambutrix","gps_lat":45.93598324324325,"gps_lng":5.33183040540541},{"value":8,"department_code":"01","insee_code":"01009","zip_code":"01300","label":"Andert-et-Condon","slug":"andert et condon","gps_lat":45.78647100671141,"gps_lng":5.65744181208053},{"value":9,"department_code":"01","insee_code":"01010","zip_code":"01350","label":"Anglefort","slug":"anglefort","gps_lat":45.91937534246575,"gps_lng":5.78904205479452},{"value":10,"department_code":"01","insee_code":"01011","zip_code":"01100","label":"Apremont","slug":"apremont","gps_lat":46.20755872093024,"gps_lng":5.65991651162791},{"value":11,"department_code":"01","insee_code":"01012","zip_code":"01110","label":"Aranc","slug":"aranc","gps_lat":46.00481852941176,"gps_lng":5.50401754901961},{"value":12,"department_code":"01","insee_code":"01013","zip_code":"01230","label":"Arandas","slug":"arandas","gps_lat":45.891865,"gps_lng":5.49309803030303},{"value":13,"department_code":"01","insee_code":"01014","zip_code":"01100","label":"Arbent","slug":"arbent","gps_lat":46.28619369863014,"gps_lng":5.68751712328767},{"value":14,"department_code":"01","insee_code":"01015","zip_code":"01300","label":"Arboys en Bugey","slug":"arboys en bugey","gps_lat":45.71719158301153,"gps_lng":5.64452416988417},{"value":15,"department_code":"01","insee_code":"01016","zip_code":"01190","label":"Arbigny","slug":"arbigny","gps_lat":46.47556610169492,"gps_lng":4.96954813559322},{"value":16,"department_code":"01","insee_code":"01017","zip_code":"01230","label":"Argis","slug":"argis","gps_lat":45.93517195876287,"gps_lng":5.48169402061856},{"value":17,"department_code":"01","insee_code":"01019","zip_code":"01510","label":"Armix","slug":"armix","gps_lat":45.85662863636362,"gps_lng":5.5744975},{"value":18,"department_code":"01","insee_code":"01021","zip_code":"01480","label":"Ars-sur-Formans","slug":"ars sur formans","gps_lat":45.99437624999999,"gps_lng":4.81913791666667},{"value":19,"department_code":"01","insee_code":"01022","zip_code":"01510","label":"Artemare","slug":"artemare","gps_lat":45.86946857142858,"gps_lng":5.69236197802198},{"value":20,"department_code":"01","insee_code":"01023","zip_code":"01570","label":"Asni\u00e8res-sur-Sa\u00f4ne","slug":"asnieres sur saone","gps_lat":46.38608654545455,"gps_lng":4.88606418181818},{"value":21,"department_code":"01","insee_code":"01024","zip_code":"01340","label":"Attignat","slug":"attignat","gps_lat":46.28585890350878,"gps_lng":5.18164934210526},{"value":22,"department_code":"01","insee_code":"01025","zip_code":"01380","label":"B\u00e2g\u00e9-Dommartin","slug":"bage dommartin","gps_lat":46.32233749999998,"gps_lng":4.957910975},{"value":23,"department_code":"01","insee_code":"01026","zip_code":"01380","label":"B\u00e2g\u00e9-le-Ch\u00e2tel","slug":"bage le chatel","gps_lat":46.30790644444445,"gps_lng":4.92956755555556}
    ];

    useEffect(() => {
        if(localStorage.getItem('id_user')){
            getInitData()
            getNext()
        }
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
                departments: res.departments.map(function(item, i){
                    return {label:item.name, value:item.id}
                }),
                regions: res.regions.map(function(item, i){
                    return {label:item.name, value:item.id}
                })
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
                setActualCity(cities.find(option => option.value === res.contractor.id_city))
                setActualDepartment(res.contractor.id_department)
                setHistory(res.history)
            }else{
                setHistory(undefined)
                setContractor(undefined)
                setActualCity({})
                setActualDepartment({})
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
        if(target.value){
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
    }
    const saveField2 = (name, value) => {
        if(value){
            fetch('/api/intranet/gestion-inscriptions-entrepreneurs/save-field', {
                method: 'POST',
                body: JSON.stringify({
                    id_user: localStorage.getItem('id_user'),
                    id_contractor: contractor.id,
                    one: name,
                    one_val: value
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
                    // target.style.border = 'solid 2px green'
                    // setInterval(() => {
                    //     target.style.border = ''
                    // }, 1500);
                }else{
                    // target.style.border = 'solid 2px red'
                    alert('ERREUR lors de la sauvegarde !')
                }
            })
            .catch(err => console.log("ERROR: ", err))
        }
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
    const filterCities = (inputValue) => {
        return cities.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    }
    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve(filterCities(inputValue));
        }, 1000);
    })
    const handleCityChange = selectedOption => {
        setActualCity(selectedOption)
        saveField2('id_city', selectedOption.value)
    }
    const onChangeZip = value => {
        setContractor({...contractor, zip: value})
        if(value.length === 2){
            const dep = value.toString()[0] + value.toString()[1]
            getDepartment(dep)
        }
    }
    const getDepartment = (value) => {
        fetch('/api/global/get-department', {
            method: 'POST',
            body: JSON.stringify({
                code: value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.department){
                setActualDepartment(res.department)
                saveField2('id_department', res.department)
            }else{
                alert('error')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const getCity = (value) => {
        fetch('/api/global/get-department', {
            method: 'POST',
            body: JSON.stringify({
                code: value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.department){
                setActualDepartment(res.department)
                saveField2('id_department', res.department)
            }else{
                alert('error')
            }
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
                    <Button className="col" color={rappelerColor} onClick={(e) => setCallbackdateUI(true)}>Rappeler plus tard <i className="fas fa-clock"></i></Button>
                    <Button className="col" color={pasInteresseColor} onClick={(e) => saveStatus('notinterested')}>Pas intéressé <i className="fas fa-comment-slash"></i></Button>
                    <Button className="col" color={refusedColor} onClick={(e) => saveStatus('refused')}>Refuser <i className="fas fa-times-circle"></i></Button>
                    <Button className="col " color={verifiedColor} onClick={(e) => saveStatus('verified')}>Valider <i className="fas fa-check-circle"></i></Button>
                </ButtonGroup>
                <Button className="col btn-primary-intranet" color="primary" onClick={(e) => getNext()}>Fiche suivante <i className="fas fa-chevron-circle-right"></i></Button>
            </div>
        </div>
        <div className="col">

        </div>
    </div>
    <div className="row">
        <div className="col-4 rf-card">
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
        <div className="col-8 rf-card">
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
                            onChange={(e) => {onChangeZip(e.target.value)}} onBlur={(e) => saveField(e.target)}/>
                        </div>
                        <div className='col'>
                            <Label for="id_department">Département <b style={{color:"#ED5B0F"}}>*</b></Label>
                            <Select
                                name="id_department"
                                value={(actualDepartment)?initData?.departments?.find(option => option.value === actualDepartment):""}
                                onChange={selectedOption => {setContractor({...contractor, id_department: selectedOption}); saveField2('id_department', selectedOption.value)}}
                                options={(initData)?initData.departments:""}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className='col-4'>
                            <Label for="id_city">Ville <b style={{color:"#ED5B0F"}}>*</b></Label>
                            <AsyncSelect
                                cacheOptions
                                loadOptions={promiseOptions}
                                defaultOptions={defaultCities}
                                value={actualCity}
                                onChange={handleCityChange}
                            />
                        </div>
                        <div className='col'>
                            <Label for="id_region">Région <b style={{color:"#ED5B0F"}}>*</b></Label>
                            <Select
                                name="id_region"
                                value={(contractor)?initData?.regions?.find(option => option.value === contractor?.id_region):""}
                                onChange={selectedOption => {setContractor({...contractor, id_region: selectedOption}); saveField2('id_region', selectedOption.value)}}
                                options={(initData)?initData.regions:""}
                            />
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
        {/* <div className="col-3 rf-card">
            <Card>
                <CardHeader className="text-center" tag="h4">Paramètres</CardHeader>
                <CardBody>
                </CardBody>
            </Card>
        </div> */}
    </div>
    </>)
}