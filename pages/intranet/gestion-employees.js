import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Card, CardHeader, CardBody, FormGroup, Input, Label, Table } from 'reactstrap'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import citiesData from '../../src/assets/json/cities.json';
import regionsData from '../../src/assets/json/regions.json';
import departmentsData from '../../src/assets/json/departments.json';

export default function gestionInscriptionsEntrepreneurs({citiesD, regionsD, departmentsD}) {
    const [employee, setEmployee] = useState(undefined)
    const [employees, setEmployees] = useState([])
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
    const [modeAdd, setModeAdd] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('id_user')){
            getEmployees()
        }
    }, [])

    const resetUI = () => {
        setModeAdd(false)
        setEmployee(undefined)
        setActualCity({})
        setActualDepartment(undefined)
        setActualRegion(undefined)
    }
    const getEmployees = () => {
        fetch('/api/intranet/gestion-employees/get-employees', {
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
                setEmployees(res.employees)
            }else{
                setEmployees(undefined)
                alert('error')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const handleClickEmployee = (e, id) => {
        if(!modeAdd){
            resetUI()
            fetch('/api/intranet/gestion-employees/get-employee', {
                method: 'POST',
                body: JSON.stringify({
                    id_user: localStorage.getItem('id_user'),
                    id_employee: id
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res.success === 'yes'){
                    setEmployee(res.employee)
                    setActualCity(cities.find(option => option.value == res.employee.code_city))
                    setActualDepartment(res.employee.code_department)
                    setActualRegion(res.employee.code_region)
                }else{
                    resetUI()
                    alert('error')
                }
            })
            .catch(err => console.log("ERROR: ", err))
        }
    }
    const saveField = (target) => {
        fetch('/api/intranet/gestion-employees/save-field', {
            method: 'POST',
            body: JSON.stringify({
                id_user: localStorage.getItem('id_user'),
                id_employee: employee.id,
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
    const saveField2 = (name, value) => {
        fetch('/api/intranet/gestion-employees/save-field', {
            method: 'POST',
            body: JSON.stringify({
                id_user: localStorage.getItem('id_user'),
                id_employee: employee.id,
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
    const handleModeAddClick = e => {
        if(!modeAdd){
            resetUI()
            setModeAdd(true)
        }
    }
    const handleConfirmAddClick = e => {
        setEmployee({...employee, code_city: actualCity.value, code_region: actualRegion, code_department: actualDepartment})
        fetch('/api/intranet/gestion-employees/add-employee', {
            method: 'POST',
            body: JSON.stringify({
                id_user: localStorage.getItem('id_user'),
                new_employee: employee
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                resetUI()
                getEmployees()
            }else{
                alert('error')
            }
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
        setEmployee({...employee, zip: value})
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
            }else{
                alert('Code postal inconnu')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }


    return (
        <div className="pl-3 pr-3 pt-2">
            <div className="row">
                <div className="col-4">
                    <Card>
                        <CardHeader className="text-center" tag="h4">Liste des employées <i className="fas fa-user-plus pl-2" onClick={handleModeAddClick}></i></CardHeader>
                        <CardBody className="p-0">
                            <Table>
                                <thead>
                                    <tr>
                                    <th>Date d'inscription</th>
                                    <th>Nom Prénom</th>
                                    <th>Id</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    (employees)?employees.map(function(item, i){
                                        return <tr onClick={(e) => handleClickEmployee(e, item.id)}>
                                            <th scope="row">{item.c_date}</th>
                                            <td>{item.lastname + ' ' + item.firstname}</td>
                                            <td>{item.id}</td>
                                        </tr>
                                    }):""
                                } 
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
                <div className="col">
                    {
                        (employee && !modeAdd)?(
                            <Card>
                                <CardHeader className="text-center" tag="h4">Fiche employée id.{(employee)?employee.id:''}<i className="fas fa-times-circle pl-2" onClick={e => {resetUI()}}></i></CardHeader>
                                <CardBody>
                                    <FormGroup className="row">
                                        <div className='col'>
                                        <Label for="firstname">Prénom <b style={{color:"#ED5B0F"}}>*</b></Label>
                                            <Input name="firstname" disabled={(!employee)} value={(employee)?employee?.firstname:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                                            </div>
                                        <div className='col'>
                                            <Label for="lastname">Nom <b style={{color:"#ED5B0F"}}>*</b></Label>
                                            <Input name="lastname" disabled={(!employee)} value={(employee)?employee?.lastname:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                                        </div>
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Courriel <b style={{color:"#ED5B0F"}}>*</b></Label>
                                        <Input name="email" disabled={(!employee)} value={(employee)?employee?.email:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <div className='col'>
                                            <Label for="phone">Téléphone <b style={{color:"#ED5B0F"}}>*</b></Label>
                                            <Input name="phone" disabled={(!employee)} value={(employee)?employee?.phone:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                                        </div>
                                        <div className='col'>
                                            <Label for="phone2">Téléphone 2</Label>
                                            <Input name="phone2" disabled={(!employee)} value={(employee)?employee?.phone2:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <div className='col'>
                                            <Label for="salary">Salaire mensuel</Label>
                                            <Input name="salary" disabled={(!employee)} value={(employee)?employee?.salary:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                                        </div>
                                        <div className='col-5'>
                                            <Label for="job_title">Titre du poste</Label>
                                            <Input name="job_title" disabled={(!employee)} value={(employee)?employee?.job_title:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <div className='col-4'>
                                            <Label for="zip">Code Postal <b style={{color:"#ED5B0F"}}>*</b></Label>
                                            <Input name="zip" type="text" disabled={(!employee)} value={(employee)?employee?.zip:""} 
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
                                        <Input name="address" disabled={(!employee)} value={(employee)?employee?.address:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})} onBlur={(e) => saveField(e.target)}/>
                                    </FormGroup>
                                </CardBody>
                            </Card>
                        ):""
                    }{
                        (modeAdd)?(
                            <Card>
                                <CardHeader className="text-center" tag="h4">Ajouter un employée <i className="fas fa-times-circle pl-2" onClick={e => {resetUI()}}></i></CardHeader>
                                <CardBody>
                                    <FormGroup className="row">
                                        <div className='col'>
                                        <Label for="firstname">Prénom <b style={{color:"#ED5B0F"}}>*</b></Label>
                                            <Input name="firstname" value={(employee)?employee?.firstname:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})}/>
                                            </div>
                                        <div className='col'>
                                            <Label for="lastname">Nom <b style={{color:"#ED5B0F"}}>*</b></Label>
                                            <Input name="lastname" value={(employee)?employee?.lastname:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})}/>
                                        </div>
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Courriel <b style={{color:"#ED5B0F"}}>*</b></Label>
                                        <Input name="email" value={(employee)?employee?.email:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})}/>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <div className='col'>
                                            <Label for="phone">Téléphone <b style={{color:"#ED5B0F"}}>*</b></Label>
                                            <Input name="phone" value={(employee)?employee?.phone:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})}/>
                                        </div>
                                        <div className='col'>
                                            <Label for="phone2">Téléphone 2</Label>
                                            <Input name="phone2" value={(employee)?employee?.phone2:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})}/>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <div className='col'>
                                            <Label for="salary">Salaire mensuel</Label>
                                            <Input name="salary" value={(employee)?employee?.salary:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})}/>
                                        </div>
                                        <div className='col-5'>
                                            <Label for="job_title">Titre du poste</Label>
                                            <Input name="job_title" value={(employee)?employee?.job_title:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})}/>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <div className='col-4'>
                                            <Label for="zip">Code Postal <b style={{color:"#ED5B0F"}}>*</b></Label>
                                            <Input name="zip" type="text" value={(employee)?employee?.zip:""} 
                                            onChange={(e) => {onChangeZip(e.target.value)}}/>
                                        </div>
                                        <div className='col'>
                                            <Label for="code_department">Département <b style={{color:"#ED5B0F"}}>*</b></Label>
                                            <Select
                                                name="code_department"
                                                value={(actualDepartment)?departments.find(option => option.value == actualDepartment):""}
                                                onChange={selectedOption => {setActualDepartment(selectedOption.value)}}
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
                                                onChange={selectedOption => {setActualRegion(selectedOption.value)}}
                                                options={(regions)?regions:""}
                                            />
                                        </div>
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="address">Adresse</Label>
                                        <Input name="address" value={(employee)?employee?.address:""} 
                                            onChange={(e) => setEmployee({...employee, [e.target.name]: e.target.value})}/>
                                    </FormGroup>
                                    <br/>
                                    <Button className="col" onClick={handleConfirmAddClick}>Ajouter <i className="fas fa-user-plus pl-2" style={{color:"white"}}></i></Button>
                                </CardBody>
                            </Card>
                        ):""
                    }
                </div>
            </div> 
        </div>
    )
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