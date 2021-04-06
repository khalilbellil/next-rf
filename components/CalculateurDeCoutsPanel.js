import React, { useState, useEffect } from 'react'
import { Button, FormGroup, Input, Label, Table } from 'reactstrap'

export default function CalculateurDeCoutsPanel() {
    const [services, setServices] = useState(undefined)
    const [actualService, setActualService] = useState(undefined)

    const [questions, setQuestions] = useState(undefined)
    
    useEffect(() => {
        resetUI()
        getServices()
    }, [])

    const resetUI = () => {
        
    }
    const getServices = () => {
        fetch('/api/calculateur-de-couts/get-services', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                setServices(res.services)
            }else{
                alert('Une erreur est survenue, merci de nous contactez directement.')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const getQuestionsAndAnswers = (id_next_question) => {
        fetch('/api/calculateur-de-couts/get-question-and-answers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_next_question: id_next_question
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                setQuestions(res.three)
            }else{
                alert('Une erreur est survenue, merci de nous contactez directement.')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const handleServiceClick = (service) => {
        setActualService(service)
    }

    const generateAnswersThenQuestionsHTML = (item) => {
        return (<>
            <div className="row pl-3 pr-3">
                <div className="col p-0 ml-3" style={{border: "2px solid green", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius:"6px"}}>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>id_question</th>
                                <th>id_next_question</th>
                                <th>name</th>
                                <th>min_price</th>
                                <th>influence_method</th>
                                <th>influence_value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.id_question}</td>
                                <td>{item.id_next_question}</td>
                                <td>{item.name}</td>
                                <td>{item.min_price}</td>
                                <td>{item.influence_method}</td>
                                <td>{item.influence_value}</td>
                                <td><i className="far fa-edit mr-3" style={{cursor: "pointer"}}></i><i className="far fa-folder-open" style={{cursor: "pointer"}}></i></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            {
                (item?.question)?(<>
                    <div className="row pl-3 pr-3 pt-2">
                        <div className="col p-0 ml-4" style={{border: "2px solid red", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius:"6px"}}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>name</th>
                                        <th>answer_is_a_field</th>
                                        <th>id_field_next_question</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">{item.question.id}</th>
                                        <td>{item.question.name}</td>
                                        <td>{item.question.answer_is_a_field}</td>
                                        <td>{item.question.id_field_next_question}</td>
                                        <td><i className="far fa-edit mr-3" style={{cursor: "pointer"}}></i><i className="far fa-folder-open" style={{cursor: "pointer"}}></i></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    {
                        (item?.answers?.length > 0)?item.answers.map((item2, y) => {
                        return generateAnswersThenQuestionsHTML(item2) }):''
                    }
                </>):''
            }
            </>)
    }

    return (
        <div className="col" style={{border: "3px solid #00517E", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
            <div className="row pl-3 pr-3">
                <FormGroup className="col">
                    <Label for="services">Choisir un service</Label>
                    <Input type="select" name="services" multiple>
                        {
                            (services?.length > 0)?(
                                services.map((item, i) => {
                                    return ( <option onClick={(e) => handleServiceClick(item)}>{item.name}</option> )
                                })
                            ):<option></option>
                        }
                    </Input>
                </FormGroup>
            </div>
                {
                    (actualService)?(<>
                    <div className="row pl-3 pr-3 pt-2">
                        <div className="col p-0" style={{border: "2px solid #00517E", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius:"6px"}}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>id_service</th>
                                        <th>id_next_question</th>
                                        <th>name</th>
                                        <th>min_price</th>
                                        <th>interval_precision</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">{actualService.id}</th>
                                        <td>{actualService.id_service}</td>
                                        <td>{actualService.id_next_question}</td>
                                        <td>{actualService.name}</td>
                                        <td>{actualService.min_price}</td>
                                        <td>{actualService.interval_precision}</td>
                                        <td><i className="far fa-edit mr-3" style={{cursor: "pointer"}}></i><i className="far fa-folder-open" style={{cursor: "pointer"}} onClick={(e) => getQuestionsAndAnswers(actualService.id_next_question)}></i></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    {
                        (questions)?(<>
                        <div className="row pl-3 pr-3 pt-2">
                            <div className="col p-0 ml-2" style={{border: "2px solid red", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius:"6px"}}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>name</th>
                                            <th>answer_is_a_field</th>
                                            <th>id_field_next_question</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">{questions.question.id}</th>
                                            <td>{questions.question.name}</td>
                                            <td>{questions.question.answer_is_a_field}</td>
                                            <td>{questions.question.id_field_next_question}</td>
                                            <td><i className="far fa-edit mr-3" style={{cursor: "pointer"}}></i><i className="far fa-folder-open" style={{cursor: "pointer"}}></i></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        {
                            (questions?.answers?.length > 0)?(questions.answers.map((item, i) => {
                                return generateAnswersThenQuestionsHTML(item)
                            })):''
                        }
                        </>):''
                    }
                    </>):''
                }
            <br/>
        </div>
    )
}