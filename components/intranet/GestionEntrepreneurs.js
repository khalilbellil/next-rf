import React, { useState, useEffect } from 'react'
import { Button, Form, Card, CardHeader, CardBody, FormGroup, Input, Label, Table } from 'reactstrap'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { Call, Search, Close } from '@material-ui/icons';

export default function GestionEntrepreneurs({ citiesP, regionsP, departmentsP }) {
    const [contractor, setContractor] = useState(undefined)
    const [history, setHistory] = useState(undefined)
    const [cities, setCities] = useState(citiesP.map(function(item, i){
        return { label: item.nom, value: item.code }
    }))
    const [regions, setRegions] = useState(regionsP.map(function(item, i){
        return { label: item.nom, value: item.code }
    }))
    const [departments, setDepartments] = useState(departmentsP.map(function(item, i){
        return { label: item.nom, value: item.code }
    }))
    const [actualCity, setActualCity] = useState({})
    const [actualDepartment, setActualDepartment] = useState(undefined)
    const [actualRegion, setActualRegion] = useState(undefined)
    const defaultCities = [
        {"label":"L'Abergement-Clémenciat","value":"01001","codeDepartement":"01","codeRegion":"84","codesPostaux":["01400"],"population":767},{"label":"L'Abergement-de-Varey","value":"01002","codeDepartement":"01","codeRegion":"84","codesPostaux":["01640"],"population":243},{"label":"Ambérieu-en-Bugey","value":"01004","codeDepartement":"01","codeRegion":"84","codesPostaux":["01500"],"population":14081},{"label":"Ambérieux-en-Dombes","value":"01005","codeDepartement":"01","codeRegion":"84","codesPostaux":["01330"],"population":1671},{"label":"Ambléon","value":"01006","codeDepartement":"01","codeRegion":"84","codesPostaux":["01300"],"population":110},{"label":"Ambronay","value":"01007","codeDepartement":"01","codeRegion":"84","codesPostaux":["01500"],"population":2684},{"label":"Ambutrix","value":"01008","codeDepartement":"01","codeRegion":"84","codesPostaux":["01500"],"population":750},{"label":"Andert-et-Condon","value":"01009","codeDepartement":"01","codeRegion":"84","codesPostaux":["01300"],"population":336},{"label":"Anglefort","value":"01010","codeDepartement":"01","codeRegion":"84","codesPostaux":["01350"],"population":1124},{"label":"Apremont","value":"01011","codeDepartement":"01","codeRegion":"84","codesPostaux":["01100"],"population":383},{"label":"Aranc","value":"01012","codeDepartement":"01","codeRegion":"84","codesPostaux":["01110"],"population":326},{"label":"Arandas","value":"01013","codeDepartement":"01","codeRegion":"84","codesPostaux":["01230"],"population":148},{"label":"Arbent","value":"01014","codeDepartement":"01","codeRegion":"84","codesPostaux":["01100"],"population":3379},{"label":"Arboys en Bugey","value":"01015","codeDepartement":"01","codeRegion":"84","codesPostaux":["01300"],"population":640},{"label":"Arbigny","value":"01016","codeDepartement":"01","codeRegion":"84","codesPostaux":["01190"],"population":462},{"label":"Argis","value":"01017","codeDepartement":"01","codeRegion":"84","codesPostaux":["01230"],"population":438},{"label":"Armix","value":"01019","codeDepartement":"01","codeRegion":"84","codesPostaux":["01510"],"population":26},{"label":"Ars-sur-Formans","value":"01021","codeDepartement":"01","codeRegion":"84","codesPostaux":["01480"],"population":1389},{"label":"Artemare","value":"01022","codeDepartement":"01","codeRegion":"84","codesPostaux":["01510"],"population":1227},{"label":"Asnières-sur-Saône","value":"01023","codeDepartement":"01","codeRegion":"84","codesPostaux":["01570"],"population":63},{"label":"Attignat","value":"01024","codeDepartement":"01","codeRegion":"84","codesPostaux":["01340"],"population":3270},{"label":"Bâgé-Dommartin","value":"01025","codeDepartement":"01","codeRegion":"84","codesPostaux":["01380"],"population":4088},{"label":"Bâgé-le-Châtel","value":"01026","codeDepartement":"01","codeRegion":"84","codesPostaux":["01380"],"population":915},{"label":"Balan","value":"01027","codeDepartement":"01","codeRegion":"84","codesPostaux":["01360"],"population":2856},{"label":"Baneins","value":"01028","codeDepartement":"01","codeRegion":"84","codesPostaux":["01990"],"population":596},{"label":"Beaupont","value":"01029","codeDepartement":"01","codeRegion":"84","codesPostaux":["01270"],"population":685},{"label":"Beauregard","value":"01030","codeDepartement":"01","codeRegion":"84","codesPostaux":["01480"],"population":885},{"label":"Bellignat","value":"01031","codeDepartement":"01","codeRegion":"84","codesPostaux":["01100"],"population":3618},{"label":"Béligneux","value":"01032","codeDepartement":"01","codeRegion":"84","codesPostaux":["01360"],"population":3314},{"label":"Valserhône","value":"01033","codeDepartement":"01","codeRegion":"84","codesPostaux":["01200"],"population":16302},{"label":"Belley","value":"01034","codeDepartement":"01","codeRegion":"84","codesPostaux":["01300"],"population":9133},{"label":"Belleydoux","value":"01035","codeDepartement":"01","codeRegion":"84","codesPostaux":["01130"],"population":317},{"label":"Valromey-sur-Séran","value":"01036","codeDepartement":"01","codeRegion":"84","codesPostaux":["01260"],"population":1299},{"label":"Bénonces","value":"01037","codeDepartement":"01","codeRegion":"84","codesPostaux":["01470"],"population":294},{"label":"Bény","value":"01038","codeDepartement":"01","codeRegion":"84","codesPostaux":["01370"],"population":762},{"label":"Béon","value":"01039","codeDepartement":"01","codeRegion":"84","codesPostaux":["01350"],"population":464},{"label":"Béréziat","value":"01040","codeDepartement":"01","codeRegion":"84","codesPostaux":["01340"],"population":494},{"label":"Bettant","value":"01041","codeDepartement":"01","codeRegion":"84","codesPostaux":["01500"],"population":750}
    ];
    const [services, setServices] = useState(undefined)
    const [actualService, setActualService] = useState(undefined)
    const [actualSecondaryService, setActualSecondaryService] = useState(undefined)
    const [searchTerm, setSearchTerm] = useState('')
    

    useEffect(() => {
        if(localStorage.getItem('id_user')){
            getInitData()
        }
    }, [])
    const resetUI = () => {
        fetch('/api/intranet/gestion-entrepreneurs/unlock-contractor', {
            method: 'POST',
            body: JSON.stringify({
                id_user: localStorage.getItem('id_user'),
                id_contractor: contractor?.id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            setContractor(undefined)
            setHistory(undefined)
            setActualCity({})
            setActualDepartment(undefined)
            setActualRegion(undefined)
            setActualService(undefined)
            setActualSecondaryService(undefined)
            setSearchTerm('')
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const getInitData = () => {
        var success = false
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
            if(res.success === 'yes'){
                setServices(res.services.map(function(item, i){
                    return { label: item.name, value: item.id }
                }))
                success = true
            }else{
                alert('Erreur lors du chargement des données !')
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
        if(target.name){
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
        if(value !== undefined){
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
        saveField2('code_city', selectedOption.value)
    }
    const onChangeZip = value => {
        if(value.length === 5){
            getCity(value)
        }else{
            setContractor({...contractor, zip: value})
        }
    }
    const getCity = (value) => {
        fetch(`https://geo.api.gouv.fr/communes?codePostal=${value}`)
        .then(res => res.json())
        .then(res => {
            if(res.length === 1){
                setActualDepartment(res[0].codeDepartement)
                setActualRegion(res[0].codeRegion)
                setActualCity(cities.find(option => option.label == (res[0].nom)))
                saveField2('code_department', res[0].codeDepartement)
                saveField2('code_region', res[0].codeRegion)
                saveField2('code_city', cities.find(option => option.label == (res[0].nom)).value)
                setContractor({...contractor, zip: value, address: value + ' ' + res[0].nom + ', ' + departments.find(option => option.value == (res[0].codeDepartement)).label + ', ' + regions.find(option => option.value == (res[0].codeRegion)).label })
            }else if(res.length > 1){
                const newRes = res.sort(function(a, b) {    
                    if (a["population"] < b["population"]) {    
                        return 1;    
                    } else if (a["population"] > b["population"]) {    
                        return -1;    
                    }    
                    return 0;    
                })//order by population desc
                setActualDepartment(newRes[0].codeDepartement)
                setActualRegion(newRes[0].codeRegion)
                setActualCity(cities.find(option => option.label == (newRes[0].nom)))
                saveField2('code_department', newRes[0].codeDepartement)
                saveField2('code_region', newRes[0].codeRegion)
                saveField2('code_city', cities.find(option => option.label == (newRes[0].nom)).value)
                setContractor({...contractor, zip: value, address: value + ' ' + res[0].nom + ', ' + departments.find(option => option.value == (res[0].codeDepartement)).label + ', ' + regions.find(option => option.value == (res[0].codeRegion)).label })
            }else{
                setContractor({...contractor, zip: value})
                alert('Code postal inconnu')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const getContractor = (e) => {
        e.preventDefault()
        if(contractor?.id){
            resetUI()
        }
        if(searchTerm){
            fetch('/api/intranet/gestion-entrepreneurs/get-contractor', {
                method: 'POST',
                body: JSON.stringify({
                    id_user: localStorage.getItem('id_user'),
                    search: searchTerm
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
                    setActualCity(cities.find(option => option.value == res.contractor.code_city))
                    setActualDepartment(res.contractor.code_department)
                    setActualRegion(res.contractor.code_region)
                    setHistory(res.history)
                    if(res?.contractor?.id_service){
                        setActualService(res.contractor.id_service)
                    }
                    if(res?.contractor?.id_secondary_service){
                        setActualSecondaryService(res.contractor.id_secondary_service)
                    }
                }else if(res.success === 'already-locked'){
                    alert("L'entrepreneur est déjà verrouillé par: " + res.alreadyLockedBy)
                }else{
                    alert('Entrepreneur introuvable !')
                }
            })
            .catch(err => console.log("ERROR: ", err))
        }
    }
    return (<>
        <div className="row pl-5 pr-5 mb-3">
            <div className='col'></div>
            <div className="col-8 pl-5 pr-5">
                <Form className="row pl-5 pr-5" onSubmit={getContractor}>
                    <Input className="col-7 mr-2" type='text' placeholder="id / téléphone / nom / courriel / nom d'entreprise" onChange={(e) => {setSearchTerm(e.target.value)}} value={searchTerm} />
                    <Button type="submit" className="col btn-primary-intranet mr-2" color="primary">Rechercher <Search/></Button>
                    <Button className="col-2 btn-secondary-intranet" color="secondary" onClick={resetUI} disabled={(!contractor?.id)}>Fermer <Close/></Button>
                </Form>
            </div>
            <div className='col'></div>
        </div>
        {(contractor?.id)?
            <div className="row">
                <div className="col-4 rf-card">
                    <Card>
                        <CardHeader className="text-center" tag="h4">Historique</CardHeader>
                        <CardBody className="p-0">
                            <Table>
                                <thead style={{width:'100%', display:'table'}}>
                                    <tr style={{display:'table', width:'100%', textAlign:'center'}}>
                                        <th>Date</th>
                                        <th>Action</th>
                                        <th>Agent</th>
                                    </tr>
                                </thead>
                                <tbody style={{overflow:'auto', height:'300px', display:'block', width:'100%'}}>
                                {
                                    (history)?history.map(function(item, i){
                                        return <tr style={{display:'table', width:'100%'}}>
                                            <th scope="row">{item.c_date}</th>
                                            <td>{item.name}</td>
                                            <td style={{textAlign:'right'}}>{item.username}</td>
                                        </tr>
                                    }):""
                                } 
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                    <Card className='mt-2'>
                        <CardHeader className="text-center" tag="h4">Informations</CardHeader>
                        <CardBody className="p-0">
                            <Table>
                                <thead>
                                    <tr>
                                    <th></th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Status</th>
                                        <td>{(contractor?.status)?contractor.status:''}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Date d'inscription</th>
                                        <td>{(contractor?.c_date)?contractor.c_date:''}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-8 rf-card">
                    <Card>
                        <CardHeader className="text-center" tag="h4">Fiche entrepreneur <b style={{color:"#ED5B0F"}}>#{(contractor)?contractor.id:''}</b></CardHeader>
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
                                    <Label for="phone">Téléphone <b style={{color:"#ED5B0F"}}>*</b> {(contractor?.phone)?<a href={"tel:"+contractor.phone}><Call/></a>:''}</Label>
                                    <Input name="phone" type="text" disabled={(!contractor)} value={(contractor)?contractor?.phone:""} 
                                    onChange={(e) => setContractor({...contractor, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                                </div>
                                <div className='col'>
                                    <Label for="phone2">Téléphone 2 {(contractor?.phone2)?<a href={"tel:"+contractor.phone2}><Call/></a>:''}</Label>
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
                                    <Label for="code_department">Département <b style={{color:"#ED5B0F"}}>*</b></Label>
                                    <Select
                                        name="code_department"
                                        value={(actualDepartment)?departments.find(option => option.value == actualDepartment):""}
                                        onChange={selectedOption => {setActualDepartment(selectedOption.value); saveField2('code_department', selectedOption.value)}}
                                        options={(departments)?departments:""}
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <div className='col-4'>
                                    <Label for="code_city">Ville <b style={{color:"#ED5B0F"}}>*</b></Label>
                                    <AsyncSelect
                                        cacheOptions
                                        loadOptions={promiseOptions}
                                        defaultOptions={defaultCities}
                                        value={actualCity}
                                        onChange={handleCityChange}
                                    />
                                </div>
                                <div className='col'>
                                    <Label for="code_region">Région <b style={{color:"#ED5B0F"}}>*</b></Label>
                                    <Select
                                        name="code_region"
                                        value={(actualRegion)?regions.find(option => option.value == actualRegion):""}
                                        onChange={selectedOption => {setActualRegion(selectedOption.value); saveField2('code_region', selectedOption.value)}}
                                        options={(regions)?regions:""}
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="address">Adresse</Label>
                                <Input name="address" type="text" disabled={(!contractor)} value={(contractor)?contractor?.address:""} 
                                onChange={(e) => setContractor({...contractor, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                            </FormGroup>
                            <FormGroup className="row">
                                <div className='col-6'>
                                    <Label for="service">Service principal <b style={{color:"#ED5B0F"}}>*</b></Label>
                                    <Select
                                        name="service"
                                        value={(actualService)?services.find(option => option.value == actualService):""}
                                        onChange={selectedOption => {setActualService(selectedOption.value); saveField2('id_service', selectedOption.value)}}
                                        options={(services)?services:""}
                                    />
                                </div>
                                <div className='col'>
                                    <Label for="secondary_service">Service secondaire</Label>
                                    <Select
                                        name="secondary_service"
                                        value={(actualSecondaryService)?services.find(option => option.value == actualSecondaryService):""}
                                        onChange={selectedOption => {setActualSecondaryService(selectedOption.value); saveField2('id_secondary_service', selectedOption.value)}}
                                        options={(services)?services:""}
                                    />
                                </div>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </div>
            </div>
        :''}
        
    </>)
}