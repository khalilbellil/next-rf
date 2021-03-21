import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Card, CardHeader, CardBody, FormGroup, Input, Label, Table } from 'reactstrap'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

export default function gestionInscriptionsEntrepreneurs() {
    const [employee, setEmployee] = useState(undefined)
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getEmployees()
    }, [])

    const getEmployees = () => {
        setEmployees(undefined)
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
                e.target.style.border = 'solid 2px green'
            }else{
                setEmployee(undefined)
                alert('error')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const saveField = (target) => {
        if(target.value){
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
    }

    return (
        <div className="pl-3 pr-3">
            <div className="row">
                <div className="col-4">
                    <Card>
                        <CardHeader className="text-center" tag="h4">Liste des employées</CardHeader>
                        <CardBody className="p-0">
                            <Table>
                                <thead>
                                    <tr>
                                    <th>Date d'inscription</th>
                                    <th>Nom Prénom</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    (employees)?employees.map(function(item, i){
                                        return <tr onClick={e => handleClickEmployee(e, item.id)}>
                                            <th scope="row">{item.c_date}</th>
                                            <td>{item.lastname + ' ' + item.firstname}</td>
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
                        (employee)?(
                            <Card>
                                <CardHeader className="text-center" tag="h4">Fiche employée</CardHeader>
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
                                            {/* <Input name="zip" type="text" disabled={(!employee)} value={(employee)?employee?.zip:""} 
                                            onChange={(e) => {onChangeZip(e.target.value)}} onBlur={(e) => saveField(e.target)}/> */}
                                        </div>
                                        <div className='col'>
                                            <Label for="code_department">Département <b style={{color:"#ED5B0F"}}>*</b></Label>
                                            {/* <Select
                                                name="code_department"
                                                value={(actualDepartment)?departments.find(option => option.value == actualDepartment):""}
                                                onChange={selectedOption => {setActualDepartment(selectedOption.value); saveField2('code_department', selectedOption.value)}}
                                                options={(departments)?departments:""}
                                            /> */}
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <div className='col-4'>
                                            <Label for="code_city">Ville <b style={{color:"#ED5B0F"}}>*</b></Label>
                                            {/* <AsyncSelect
                                                cacheOptions
                                                loadOptions={promiseOptions}
                                                defaultOptions={defaultCities}
                                                value={actualCity}
                                                onChange={handleCityChange}
                                            /> */}
                                        </div>
                                        <div className='col'>
                                            <Label for="code_region">Région <b style={{color:"#ED5B0F"}}>*</b></Label>
                                            {/* <Select
                                                name="code_region"
                                                value={(actualRegion)?regions.find(option => option.value == actualRegion):""}
                                                onChange={selectedOption => {setActualRegion(selectedOption.value); saveField2('code_region', selectedOption.value)}}
                                                options={(regions)?regions:""}
                                            /> */}
                                        </div>
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="address">Adresse</Label>
                                    </FormGroup>
                                </CardBody>
                            </Card>
                        ):""
                    }
                </div>
            </div> 
        </div>
    )
}