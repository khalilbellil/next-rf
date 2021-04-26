import React, { useState, useEffect, useRef } from 'react'
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table, Form } from 'reactstrap'
import Tree from 'react-d3-tree';

export default function CalculateurDeCoutsPanel() {
    const [services, setServices] = useState(undefined)
    const [actualService, setActualService] = useState(undefined)
    const [questions, setQuestions] = useState(undefined)
    const [selectedNode, setSelectedNode] = useState({})
    const [newAnswer, setNewAnswer] = useState({})
    const [newQuestion, setNewQuestion] = useState({})
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);
    const [modal3, setModal3] = useState(false);
    const toggle3 = () => setModal3(!modal3);
    
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
        setQuestions({})
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
    const generateAnswersThenQuestionsHTML2 = (item) => {
        return (
            <ul>
            <li>
                <Input type="checkbox" name="tall-1" id="tall-1" />
                <label for="tall">
                <div class="ball" data-id="1"></div>
                <Input type="text" className="col-1" value={item.id} disabled/>
                <Input type="text" className="col-8" value={item.id_question} disabled/>
                <Input type="text" value={item.id_next_question} disabled/>
                <Input type="text" value={item.name} disabled/>
                <Input type="text" className="col-8" value={item.min_price} disabled/>
                <Input type="text" value={item.influence_method} disabled/>
                <Input type="text" value={item.influence_value} disabled/>
                <p><i className="far fa-edit mr-3" style={{cursor: "pointer"}}></i><i className="far fa-folder-open" style={{cursor: "pointer"}}></i></p>
                <div class="action-list">
                    <i class="fa fa-trash"></i>
                    <i class="fa fa-plus"></i>
                </div>
                </label>
                {
                    (item?.question)?(<>
                        <ul class="treeview checklist">
                        <li>
                            <Input type="checkbox" name="tall" id="tall-2" />
                            <label for="tall">
                            <div class="ball" data-id="1"></div>
                            <Input type="text" className="col-1" value={item?.question.id} disabled/>
                            <Input type="text" className="col-8" value={item?.question.name} disabled/>
                            <Input type="text" value={item?.question.answer_is_a_field} disabled/>
                            <Input type="text" value={item?.question.id_field_next_question} disabled/>
                            <p><i className="far fa-edit mr-3" style={{cursor: "pointer"}}></i><i className="far fa-folder-open" style={{cursor: "pointer"}}></i></p>
                            <div class="action-list">
                                <i class="fa fa-trash"></i>
                                <i class="fa fa-plus"></i>
                            </div>
                            </label>

                            {
                                (item?.answers?.length > 0)?item.answers.map((item2, y) => {
                                    return generateAnswersThenQuestionsHTML2(item2) 
                                }):''
                            }

                        </li>
                        </ul>

                    </>):''
                }

            </li>
            </ul>
            )
    }
    const generateServiceContentHTML = (questions) => {
        return(<>
            <div className="row pl-3 pr-3 pt-2">
                <div className="col p-0 ml-2">


                    <ul class="treeview checklist">
                    <li>
                        <Input type="checkbox" name="tall" id="tall" />
                        <label for="tall">
                        <div class="ball" data-id="1"></div>
                        <Input type="text" className="col-1" value={questions.question.id} disabled/>
                        <Input type="text" className="col-8" value={questions.question.name} disabled/>
                        <Input type="text" value={questions.question.answer_is_a_field} disabled/>
                        <Input type="text" value={questions.question.id_field_next_question} disabled/>
                        <p><i className="far fa-edit mr-3" style={{cursor: "pointer"}}></i><i className="far fa-folder-open" style={{cursor: "pointer"}}></i></p>
                        <div class="action-list">
                            <i class="fa fa-trash"></i>
                            <i class="fa fa-plus"></i>
                        </div>
                        </label>

                        {
                            (questions?.answers?.length > 0)?(questions.answers.map((item, i) => {
                                return generateAnswersThenQuestionsHTML2(item)
                            })):''
                        }

                    </li>
                    </ul>

                </div>
            </div>
            
            </>)
    }

    const onNodeClick = (e) => {
        setSelectedNode(e.attributes)
        toggle()
    }
    const handleSaveClick = (e) => {
        fetch('/api/calculateur-de-couts/save-fields', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                attributes: selectedNode
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                getQuestionsAndAnswers(actualService.id_next_question)
                toggle()
            }else{
                alert('Une erreur est survenue, merci de nous contactez directement.')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }

    const createNewAnswer = (e) => {
        e.preventDefault()
        fetch('/api/calculateur-de-couts/create-new-answer', {
            method: 'POST',
            body: JSON.stringify({
                name: newAnswer.name,
                influence_method: (newAnswer.influence_method)?newAnswer.influence_method:undefined,
                influence_value: (newAnswer.influence_value)?newAnswer.influence_value:undefined,
                id_question: selectedNode.id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                getQuestionsAndAnswers(actualService.id_next_question)
                toggle()
                toggle2()
            }else{
                alert('Une erreur est survenue, merci de nous contactez directement...')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }

    const createNewQuestion = (e) => {
        e.preventDefault()
        fetch('/api/calculateur-de-couts/create-new-question', {
            method: 'POST',
            body: JSON.stringify({
                name: newQuestion.name,
                answer_is_a_field: newQuestion.answer_is_a_field,
                id_parent_answer: selectedNode.id,
                id_question: selectedNode.id_question
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                getQuestionsAndAnswers(actualService.id_next_question)
                toggle()
                toggle3()
            }else{
                alert('Une erreur est survenue, merci de nous contactez directement...')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }

    return (
        <div className="col" style={{border: "3px solid #00517E", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
            <section id="visualisation">
        </section>
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
                    (questions)?(<div className="row pl-3 pr-3 pt-2"><div className="col p-0" style={{border: "2px solid #00517E", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius:"6px", minHeight:"800px"}}>
                        <Tree data={questions} pathFunc="diagonal" orientation="vertical" onNodeClick={(e) => onNodeClick(e)}  onNodeMouseOver={(e) => console.log('e', e)} collapsible={false}/>
                    </div></div>):''
                }
                </>):''
            }
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modification</ModalHeader>
                <ModalBody>
                    {
                        (selectedNode)?Object.keys(selectedNode).map((item, i) => {
                            if(item !== 'type' && item !== 'id_question' && item !== 'id_next_question'){
                                switch (item) {
                                    case 'influence_method':
                                        return (<>
                                         <Label>Méthode d'influence du prix</Label>
                                         <Input type="select" value={selectedNode[item]} onChange={e => setSelectedNode({...selectedNode, [item]:e.target.value})}>
                                             <option value="">Ne rien faire</option>
                                             <option value="wait">Multiplier VALEUR avec le prochain input puis additioner au prix</option>
                                             <option value="+%">Augmentation de VALEUR% du prix</option>
                                             <option value="-%">Réduction de VALEUR% du prix</option>
                                         </Input>
                                         </>)

                                    case 'answer_is_a_field':
                                        return (selectedNode["type"] == 'answer')?(<>
                                        
                                        </>):(<>
                                            <Label>La réponse sera un champ ?</Label>
                                            <Input type="select" name="answer_is_a_field" value={selectedNode[item]} onChange={e => setSelectedNode({...selectedNode, [item]:e.target.value})}>
                                                <option value="">Non</option>
                                                <option value="1">Oui</option>
                                            </Input>
                                        </>)

                                    default:
                                         return (<>
                                         <Label>{item}</Label>
                                         <Input type="text" value={selectedNode[item]} disabled={(item === 'id')} onChange={e => setSelectedNode({...selectedNode, [item]:e.target.value})}/>
                                         </>)
                                }
                            }
                        }):''
                    }
                </ModalBody>
                <ModalFooter>
                {
                    (selectedNode['type'] === 'answer')?(<>
                        <Button color="secondary" onClick={toggle3}>Ajouter une question</Button>
                    </>):(<>
                        <Button color="secondary" onClick={toggle2}>Ajouter une réponse</Button>
                    </>)
                }
                <Button color="primary" onClick={handleSaveClick}>Sauvegarder</Button>{' '}
                <Button color="secondary" onClick={toggle}>Annuler</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modal2} toggle={toggle2}>
                <ModalHeader toggle={toggle2}>Création d'une réponse</ModalHeader>
                <ModalBody>
                    <Label>Nom</Label>
                    <Input type="text" name="name" value={newAnswer?.name} onChange={e => setNewAnswer({...newAnswer, [e.target.name]:e.target.value})}/>
                    <Label>Méthode d'influence du prix</Label>
                    <Input type="select" name="influence_method" value={newAnswer?.influence_method} onChange={e => setNewAnswer({...newAnswer, [e.target.name]:e.target.value})}>
                        <option value="">Ne rien faire</option>
                        <option value="wait">Multiplier VALEUR avec le prochain input puis additioner au prix</option>
                        <option value="+%">Augmentation de VALEUR% du prix</option>
                        <option value="-%">Réduction de VALEUR% du prix</option>
                    </Input>
                    <Label>Valeur d'influence du prix</Label>
                    <Input type="text" name="influence_value" value={newAnswer?.influence_value} onChange={e => setNewAnswer({...newAnswer, [e.target.name]:e.target.value})}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={createNewAnswer}>Créer la réponse</Button>{' '}
                    <Button color="secondary" onClick={toggle2}>Annuler</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modal3} toggle={toggle3}>
                <ModalHeader toggle={toggle3}>Création d'une question</ModalHeader>
                <ModalBody>
                    <Label>Nom</Label>
                    <Input type="text" name="name" value={newQuestion?.name} onChange={e => setNewQuestion({...newQuestion, [e.target.name]:e.target.value})}/>
                    <Label>La réponse sera un champ ?</Label>
                    <Input type="select" name="answer_is_a_field" value={newQuestion?.answer_is_a_field} onChange={e => setNewQuestion({...newQuestion, [e.target.name]:e.target.value})}>
                        <option value="">Non</option>
                        <option value="1">Oui</option>
                    </Input>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={createNewQuestion}>Créer la question</Button>{' '}
                    <Button color="secondary" onClick={toggle3}>Annuler</Button>
                </ModalFooter>
            </Modal>
            <br/>
        </div>
    )
}