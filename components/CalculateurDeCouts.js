import React, { useState, useEffect } from 'react'
import { Button, Input, Label, Progress } from 'reactstrap'

export default function CalculateurDeCouts() {
    const [actualQuestion, setActualQuestion] = useState(undefined)
    const [actualAnswers, setActualAnswers] = useState(undefined)
    const [waitValue, setWaitValue] = useState(undefined)
    const [inputValue, setInputValue] = useState('')

    const [actualPrice, setActualPrice] = useState(0)
    const [steps, setSteps] = useState(0)
    const [history, setHistory] = useState(undefined)

    const [finalPriceStart, setFinalPriceStart] = useState(0)
    const [finalPriceEnd, setFinalPriceEnd] = useState(0)
    
    useEffect(() => {
        resetUI()
        resetValues()
        getServices()
    }, [])

    const resetUI = () => {
        setActualQuestion(undefined)
        setActualAnswers(undefined)
        setWaitValue(undefined)
        setInputValue('')
    }
    const resetValues = () => {
        setActualPrice(0)
        setSteps(0)
        setHistory(undefined)
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
                setActualAnswers(res.services)
                setActualQuestion({id:0, name: 'Choisir un type de projet'})
            }else{
                alert('Une erreur est survenue, merci de nous contactez directement.')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }
    const handleAnswerClick = (answer) => {
        if(answer?.influence_method === 'wait'){
            setWaitValue(answer.influence_value)
        }else{
            if(waitValue){
                setWaitValue(undefined)
            }
        }
        fetch('/api/calculateur-de-couts/get-next', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_next_question: (answer)?answer?.id_next_question:actualQuestion?.id_field_next_question,
                wait: waitValue,
                input: inputValue,
                actual_price: actualPrice,
                influence_method: answer?.influence_method,
                influence_value: answer?.influence_value,
                min_price: (history?.length > 0)?history[0].answer.min_price:'',
                interval_precision: (history?.length > 0)?history[0].answer.interval_precision:''
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === 'yes'){
                if(res.new_price){
                    setActualPrice(res.new_price)
                }
                if(!res.finish){
                    let new_history = history
                    if(!new_history){
                        new_history = []
                    }
                    new_history[new_history.length] = {question: actualQuestion, answer: (answer)?answer:{name: inputValue}}
                    setHistory(new_history)
                    setActualAnswers(res.answers)
                    setActualQuestion(res.question)
                    setSteps(steps + 20)
                }else{
                    resetUI()
                    setSteps(100)
                    setFinalPriceStart(res.final_price_start)
                    setFinalPriceEnd(res.final_price_end)
                }
            }else{
                alert('Une erreur est survenue, merci de nous contactez directement.')
            }
        })
        .catch(err => console.log("ERROR: ", err))
    }

    return (steps < 100)?(
        <div className="col" style={{border: "3px solid #00517E", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
            <div className="row">
                <div className="col text-center">
                    <h2>{actualQuestion?.name}</h2>
                </div>
            </div>
            <div className="row pl-5 pr-5">
                <div className="col p-3">
                    <div className="row">
                        {
                            (actualAnswers?.length > 0)?actualAnswers.map((item, i) => {
                                return (
                                <div className="col-md-4 mb-3">
                                    <div className="col-md service-card text-center" onClick={(e) => handleAnswerClick(item)}>
                                        <p style={{color:'white', fontSize:'24px'}}>{item.name}</p>
                                    </div>
                                </div>)
                            }):(actualQuestion?.answer_is_a_field == 1)?(
                                <div className="col pl-5 pr-5 pt-2 pb-2">
                                    <Input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                                    <Button onClick={(e) => handleAnswerClick(undefined)}>Confirmer</Button>
                                </div>
                            ):''
                            
                        }
                    </div>
                </div>
            </div>
            <div className="row pt-3">
                <div className="col text-center"><h4>ou</h4></div>
            </div>
            <div className="row">
                <div className="col" style={{paddingLeft:"30%", paddingRight:"30%"}}>
                    <Button className="col">Passer à l’étape finale et recevoir 3 soumissions</Button>
                </div>
            </div>
            <div className="row">
                <hr style={{borderTop:"3px solid #00517E", width:"100%"}}/>
                <div className="col pb-3 pl-3 pr-3">
                    {/* <div className="text-center" style={{color:"#00517E"}}>{steps}%</div> */}
                    <Progress value={steps} style={{boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}/>
                </div>
            </div>
        </div>
    ):(
        <div className="col">
            <div className="row" style={{border: "3px solid #00517E", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
                <div className="col-md-7">

                </div>
                <div className="col-md">
                    <h2><b>Resumé de l’estimé</b></h2>
                    <br/>
                    <ol>
                        {
                            (history?.length > 0)?(
                                history.map((item, i) => {
                                    return <li>{item.question?.name} <b>{item.answer?.name}</b></li>
                                })
                            ):''
                        }
                    </ol>
                    <br/>
                </div>
            </div>
            <div className="row" style={{backgroundColor:"#27B44E", borderLeft:"6px solid #00517E", borderRight:"6px solid #00517E", borderBottom:"6px solid #00517E", 
            borderTop:"3px solid #00517E"}}>
                <div className="col pl-5 pr-5 text-center">
                    <h2><b>Estimation des coûts</b></h2>
                    <h1 style={{fontFamily:"Roboto",fontStyle:"normal",fontWeight:"bold",fontSize:"72px",lineHeight:"112px",color:"white",textShadow:"0px 4px 4px rgba(0, 0, 0, 0.25",
                    WebkitTextStrokeWidth:"2px",WebkitTextStrokeColor:"black"}}>{finalPriceStart}$ à {finalPriceEnd}$</h1>
                </div>
            </div>
        </div>
    )
}