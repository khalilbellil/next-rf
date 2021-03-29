import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Card, CardHeader, CardBody, FormGroup, Input, Label, Table } from 'reactstrap'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import citiesData from '../../src/assets/json/cities.json';
import regionsData from '../../src/assets/json/regions.json';
import departmentsData from '../../src/assets/json/departments.json';

export default function gestionClients({citiesD, regionsD, departmentsD}) {
    const [client, setClient] = useState(undefined)
    const [projects, setProjects] = useState(undefined)
    const [history, setHistory] = useState(undefined)
    const [pasInteresseColor, setPasInteresseColor] = useState('secondary')
    const [verifiedColor, setVerifiedColor] = useState('secondary')
    const [refusedColor, setRefusedColor] = useState('secondary')
    const [delays, setDelays] = useState(undefined)
    const [cities, setCities] = useState(citiesD.map(function(item, i){
        return { label: item.nom, value: item.code }
    }))
    const [regions, setRegions] = useState(regionsD.map(function(item, i){
        return { label: item.nom, value: item.code }
    }))
    const [departments, setDepartments] = useState(departmentsD.map(function(item, i){
        return { label: item.nom, value: item.code }
    }))
    const [actualCity, setActualCity] = useState({})
    const [actualDepartment, setActualDepartment] = useState(undefined)
    const [actualRegion, setActualRegion] = useState(undefined)
    const defaultCities = [
        {"label":"L'Abergement-Clémenciat","value":"01001","codeDepartement":"01","codeRegion":"84","codesPostaux":["01400"],"population":767},{"label":"L'Abergement-de-Varey","value":"01002","codeDepartement":"01","codeRegion":"84","codesPostaux":["01640"],"population":243},{"label":"Ambérieu-en-Bugey","value":"01004","codeDepartement":"01","codeRegion":"84","codesPostaux":["01500"],"population":14081},{"label":"Ambérieux-en-Dombes","value":"01005","codeDepartement":"01","codeRegion":"84","codesPostaux":["01330"],"population":1671},{"label":"Ambléon","value":"01006","codeDepartement":"01","codeRegion":"84","codesPostaux":["01300"],"population":110},{"label":"Ambronay","value":"01007","codeDepartement":"01","codeRegion":"84","codesPostaux":["01500"],"population":2684},{"label":"Ambutrix","value":"01008","codeDepartement":"01","codeRegion":"84","codesPostaux":["01500"],"population":750},{"label":"Andert-et-Condon","value":"01009","codeDepartement":"01","codeRegion":"84","codesPostaux":["01300"],"population":336},{"label":"Anglefort","value":"01010","codeDepartement":"01","codeRegion":"84","codesPostaux":["01350"],"population":1124},{"label":"Apremont","value":"01011","codeDepartement":"01","codeRegion":"84","codesPostaux":["01100"],"population":383},{"label":"Aranc","value":"01012","codeDepartement":"01","codeRegion":"84","codesPostaux":["01110"],"population":326},{"label":"Arandas","value":"01013","codeDepartement":"01","codeRegion":"84","codesPostaux":["01230"],"population":148},{"label":"Arbent","value":"01014","codeDepartement":"01","codeRegion":"84","codesPostaux":["01100"],"population":3379},{"label":"Arboys en Bugey","value":"01015","codeDepartement":"01","codeRegion":"84","codesPostaux":["01300"],"population":640},{"label":"Arbigny","value":"01016","codeDepartement":"01","codeRegion":"84","codesPostaux":["01190"],"population":462},{"label":"Argis","value":"01017","codeDepartement":"01","codeRegion":"84","codesPostaux":["01230"],"population":438},{"label":"Armix","value":"01019","codeDepartement":"01","codeRegion":"84","codesPostaux":["01510"],"population":26},{"label":"Ars-sur-Formans","value":"01021","codeDepartement":"01","codeRegion":"84","codesPostaux":["01480"],"population":1389},{"label":"Artemare","value":"01022","codeDepartement":"01","codeRegion":"84","codesPostaux":["01510"],"population":1227},{"label":"Asnières-sur-Saône","value":"01023","codeDepartement":"01","codeRegion":"84","codesPostaux":["01570"],"population":63},{"label":"Attignat","value":"01024","codeDepartement":"01","codeRegion":"84","codesPostaux":["01340"],"population":3270},{"label":"Bâgé-Dommartin","value":"01025","codeDepartement":"01","codeRegion":"84","codesPostaux":["01380"],"population":4088},{"label":"Bâgé-le-Châtel","value":"01026","codeDepartement":"01","codeRegion":"84","codesPostaux":["01380"],"population":915},{"label":"Balan","value":"01027","codeDepartement":"01","codeRegion":"84","codesPostaux":["01360"],"population":2856},{"label":"Baneins","value":"01028","codeDepartement":"01","codeRegion":"84","codesPostaux":["01990"],"population":596},{"label":"Beaupont","value":"01029","codeDepartement":"01","codeRegion":"84","codesPostaux":["01270"],"population":685},{"label":"Beauregard","value":"01030","codeDepartement":"01","codeRegion":"84","codesPostaux":["01480"],"population":885},{"label":"Bellignat","value":"01031","codeDepartement":"01","codeRegion":"84","codesPostaux":["01100"],"population":3618},{"label":"Béligneux","value":"01032","codeDepartement":"01","codeRegion":"84","codesPostaux":["01360"],"population":3314},{"label":"Valserhône","value":"01033","codeDepartement":"01","codeRegion":"84","codesPostaux":["01200"],"population":16302},{"label":"Belley","value":"01034","codeDepartement":"01","codeRegion":"84","codesPostaux":["01300"],"population":9133},{"label":"Belleydoux","value":"01035","codeDepartement":"01","codeRegion":"84","codesPostaux":["01130"],"population":317},{"label":"Valromey-sur-Séran","value":"01036","codeDepartement":"01","codeRegion":"84","codesPostaux":["01260"],"population":1299},{"label":"Bénonces","value":"01037","codeDepartement":"01","codeRegion":"84","codesPostaux":["01470"],"population":294},{"label":"Bény","value":"01038","codeDepartement":"01","codeRegion":"84","codesPostaux":["01370"],"population":762},{"label":"Béon","value":"01039","codeDepartement":"01","codeRegion":"84","codesPostaux":["01350"],"population":464},{"label":"Béréziat","value":"01040","codeDepartement":"01","codeRegion":"84","codesPostaux":["01340"],"population":494},{"label":"Bettant","value":"01041","codeDepartement":"01","codeRegion":"84","codesPostaux":["01500"],"population":750}
    ];

    useEffect(() => {
        if(localStorage.getItem('id_user')){
            getInitData()
            getNext()
        }
    }, [])
    const resetUI = () => {
        setClient(undefined)
        setPasInteresseColor('secondary')
        setVerifiedColor('secondary')
        setRefusedColor('secondary')
    }
    const getInitData = () => {
        fetch('/api/intranet/gestion-clients/get-init-data', {
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
                console.log(res.delays)
                setDelays(res.delays)
            }else{
                alert('Error')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const getNext = () => {
        resetUI()
        fetch('/api/intranet/gestion-clients/get-next', {
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
                setClient(res.client)
                setActualCity(cities.find(option => option.value == res.client.code_city))
                setActualDepartment(res.client.code_department)
                setActualRegion(res.client.code_region)
                setHistory(res.history)
                res.projects.forEach(p => {
                    p.callbackui = false
                    if(p.callbacklater){
                        p.callbacklater_time = p.callbacklater[11] + p.callbacklater[12] + p.callbacklater[13] + p.callbacklater[14] + p.callbacklater[15]
                        p.callbacklater_date = p.callbacklater[0] + p.callbacklater[1] + p.callbacklater[2] + p.callbacklater[3] + p.callbacklater[4] + p.callbacklater[5] + p.callbacklater[6] + p.callbacklater[7] + p.callbacklater[8] + p.callbacklater[9]
                        p.callbackcolor = 'primary'
                    }else{
                        p.callbacklater_date = ''
                        p.callbacklater_time = ''
                        p.callbackcolor = 'secondary'
                    }
                })
                setProjects(res.projects)
            }else{
                setHistory(undefined)
                setClient(undefined)
                setActualCity({})
                setActualDepartment(undefined)
                setActualRegion(undefined)
                alert('Vous avez traiter toutes les fiches disponible actuellement. Merci')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const getHistory = () => {
        fetch('/api/intranet/get-client-history', {
            method: 'POST',
            body: JSON.stringify({
                id_user: localStorage.getItem('id_user'),
                id_client: client.id
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
        //saveField2('code_city', selectedOption.value)
    }
    const onChangeZip = value => {
        setClient({...client, zip: value})
        if(value.length === 5){
            getCity(value)
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
                //saveField2('code_department', res[0].codeDepartement)
                //saveField2('code_region', res[0].codeRegion)
                //saveField2('code_city', cities.find(option => option.label == (res[0].nom)).value)
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
                //saveField2('code_department', newRes[0].codeDepartement)
                //saveField2('code_region', newRes[0].codeRegion)
                //saveField2('code_city', cities.find(option => option.label == (newRes[0].nom)).value)
            }else{
                alert('Code postal inconnu')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const handleCallBackLater = (index) => {
        if(projects[index].callbacklater_date && projects[index].callbacklater_time){
            fetch('/api/intranet/gestion-clients/save-field', {
                method: 'POST',
                body: JSON.stringify({
                    id_user: localStorage.getItem('id_user'),
                    id_client: client.id,
                    id_project: (index !== undefined)?projects[index].id:'',
                    one: 'callbacklater',
                    one_val: projects[index].callbacklater_date + ' ' + projects[index].callbacklater_time + ':00'
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res.success === 'yes'){
                    let newArr = [...projects]
                    newArr[index]['callbackcolor'] = 'primary'
                    setProjects(newArr)
                }else{
                    let newArr = [...projects]
                    newArr[index]['callbackcolor'] = 'danger'
                    setProjects(newArr)
                    alert('ERREUR lors de la sauvegarde !')
                }
            })
            .catch(err => console.log("ERROR: ", err))
        }
    }
    const onChangeInputProject = (target, index) => {
        let newArr = [...projects]
        newArr[index][target.name] = target.value
        setProjects(newArr)
    }
    const onBlurInputProject = (target, index) => {
        fetch('/api/intranet/gestion-clients/save-field', {
            method: 'POST',
            body: JSON.stringify({
                id_user: localStorage.getItem('id_user'),
                id_client: client.id,
                id_project: (index !== undefined)?projects[index].id:'',
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
    
    return (<div className="col">
    <div className="row pl-5 pr-5 pb-3">
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
                <CardHeader className="text-center" tag="h4">Fiche client <b style={{color:"#ED5B0F"}}>#{(client)?client.id:''}</b></CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label for="name">Nom <b style={{color:"#ED5B0F"}}>*</b></Label>
                        <Input name="name" disabled={(!client)} value={(client)?client?.name:""} style={{border:''}}
                        onChange={(e) => setClient({...client, [e.target.name]: e.target.value})} onBlur={(e) => onBlurInputProject(e.target, undefined)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Courriel <b style={{color:"#ED5B0F"}}>*</b></Label>
                        <Input name="email" disabled={(!client)} value={(client)?client?.email:""} 
                        onChange={(e) => setClient({...client, [e.target.name]: e.target.value})} onBlur={(e) => onBlurInputProject(e.target, undefined)}/>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className='col'>
                            <Label for="phone">Téléphone <b style={{color:"#ED5B0F"}}>*</b></Label>
                            <Input name="phone" type="text" disabled={(!client)} value={(client)?client?.phone:""} 
                            onChange={(e) => setClient({...client, [e.target.name]: e.target.value})} onBlur={(e) => onBlurInputProject(e.target, undefined)}/>
                        </div>
                        <div className='col'>
                            <Label for="phone2">Téléphone 2</Label>
                            <Input name="phone2" type="text" disabled={(!client)} value={(client)?client?.phone2:""} 
                            onChange={(e) => setClient({...client, [e.target.name]: e.target.value})} onBlur={(e) => onBlurInputProject(e.target, undefined)}/>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="address_client">Adresse principale</Label>
                        <Input name="address_client" type="text" disabled={(!client)} value={(client)?client?.address:""} 
                        onChange={(e) => setClient({...client, [e.target.name]: e.target.value})} onBlur={(e) => onBlurInputProject(e.target, undefined)}/>
                    </FormGroup>
                    <div className="row pl-3 pr-3">
                        <Button className="col btn-primary-intranet" color="primary" onClick={(e) => getNext()}>Fiche suivante <i className="fas fa-chevron-circle-right"></i></Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    </div>
    {
        (projects)?projects.map(function(item, i){
            return (
                <div className="row pl-5 pr-5 pb-3">
                    <div className="col rf-card">
                        <Card>
                            <CardHeader className="text-center" tag="h4">
                                <div className="row">
                                    <div className="col-3" style={{fontSize:"16px"}}>Status: <b style={{color:"#ED5B0F"}}>{item.project_status}</b></div>
                                    <div className="col-6">Fiche projet <b style={{color:"#ED5B0F"}}>#{item.id}</b></div>
                                    <div className="col-3" style={{fontSize:"16px"}}>Date de la demande: <b style={{color:"#ED5B0F"}}>{item.c_date}</b></div>
                                </div>
                                <div className="row">
                                    <div className="col-2">
                                        {
                                            (item.callbackui)?(<div className="row">
                                                <Input className="col" type='date' name="callbacklater_date" onChange={(e) => onChangeInputProject(e.target, i)} value={item.callbacklater_date}/>
                                                <Input className="col" type='time' name="callbacklater_time" onChange={(e) => onChangeInputProject(e.target, i)} value={item.callbacklater_time}/>
                                                <Button onClick={e => handleCallBackLater(i)}>Valider</Button>
                                            </div>):''
                                        }
                                    </div>
                                    <div className="col">
                                        <Button className="" color={item.callbackcolor} onClick={(e) => {
                                            let newArr = [...projects]
                                            if(!newArr[i]["callbackui"]){
                                                newArr[i]["callbackui"] = true
                                            }else{
                                                newArr[i]["callbackui"] = false
                                            }
                                            setProjects(newArr)
                                        }}>Rappeler plus tard <i className="fas fa-clock"></i></Button>
                                        <Button className="" color={refusedColor} onClick={(e) => saveStatus('refused')}>Courriel <i className="far fa-envelope"></i></Button>
                                        <Button className="" color={pasInteresseColor} onClick={(e) => saveStatus('canceled')}>Annuler <i className="fas fa-times-circle"></i></Button>
                                        <Button className=" " color={verifiedColor} onClick={(e) => saveStatus('activated')}>Activer <i className="fas fa-check-circle"></i></Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label for="description">Description <b style={{color:"#ED5B0F"}}>*</b></Label>
                                    <Input type="textarea" name="description" value={item.description} 
                                    onChange={(e) => onChangeInputProject(e.target, i)} onBlur={(e) => onBlurInputProject(e.target, i)}/>
                                </FormGroup>
                                <FormGroup className="row">
                                    <div className='col'>
                                        <Label for="id_service">Service <b style={{color:"#ED5B0F"}}>*</b></Label>
                                        <Input name="id_service" type="select" value={item.id_service} 
                                        onChange={(e) => onChangeInputProject(e.target, i)}>
                                            <option>Choisir</option>
                                        </Input>
                                    </div>
                                    <div className='col'>
                                        <Label for="id_subservice">Sous service <b style={{color:"#ED5B0F"}}>*</b></Label>
                                        <Input name="id_subservice" type="select" value={item.id_subservice} 
                                        onChange={(e) => onChangeInputProject(e.target, i)}>
                                            <option>Choisir</option>
                                        </Input>
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <div className='col'>
                                        <Label for="budget">Budget</Label>
                                        <Input name="budget" type="text" value={item.budget} 
                                        onChange={(e) => onChangeInputProject(e.target, i)} onBlur={(e) => onBlurInputProject(e.target, i)}/>
                                    </div>
                                    <div className='col-5'>
                                        <Label for="id_project_delay">Délais avant début des travaux <b style={{color:"#ED5B0F"}}>*</b></Label>
                                        <Input name="id_project_delay" type="select" value={item.id_project_delay} 
                                        onChange={(e) => onChangeInputProject(e.target, i)}>
                                            <option>Choisir</option>
                                            {
                                                (delays)?delays.map(function(item, i){
                                                    return <option value={item.id}>{item.name}</option>
                                                }):""
                                            }
                                        </Input>
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <div className='col-4'>
                                        <Label for="zip">Code Postal <b style={{color:"#ED5B0F"}}>*</b></Label>
                                        <Input name="zip" type="text" value={item.zip} 
                                        onChange={(e) => onChangeInputProject(e.target, i)} onBlur={(e) => onBlurInputProject(e.target, i)}/>
                                    </div>
                                    <div className='col'>
                                        <Label for="code_department">Département <b style={{color:"#ED5B0F"}}>*</b></Label>
                                        <Select
                                            name="code_department"
                                            value={(actualDepartment)?departments.find(option => option.value == actualDepartment):""}
                                            onChange={(e) => onChangeInputProject(e.target, i)}
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
                                            onChange={(e) => onChangeInputProject(e.target, i)}
                                        />
                                    </div>
                                    <div className='col'>
                                        <Label for="code_region">Région <b style={{color:"#ED5B0F"}}>*</b></Label>
                                        <Select
                                            name="code_region"
                                            value={(actualRegion)?regions.find(option => option.value == actualRegion):""}
                                            onChange={(e) => onChangeInputProject(e.target, i)} 
                                            options={(regions)?regions:""}
                                        />
                                    </div>
                                    
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address">Adresse <b style={{color:"#ED5B0F"}}>*</b></Label>
                                    <Input name="address" type="text" value={item.address} 
                                    onChange={(e) => onChangeInputProject(e.target, i)} onBlur={(e) => onBlurInputProject(e.target, i)}/>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )
        }):""
    }
    </div>)
}

export async function getStaticProps() {
    const citiesD = citiesData
    const regionsD = regionsData
    const departmentsD = departmentsData
    

    return {
        props: {
            citiesD,
            regionsD,
            departmentsD
        },
    }
}