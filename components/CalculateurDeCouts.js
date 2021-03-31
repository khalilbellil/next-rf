import React, { useState } from 'react'
import { Line } from "react-chartjs-2"
import { Button, FormGroup, Input, Label } from 'reactstrap'

export default function CalculateurDeCouts(props) {
    const [dataLine, setDataLine] = useState({
        labels: ["Prix minimum ($C)", "Prix moyen ($C)", "Prix maximum ($C)"],
        datasets: [
        {
            label: "Inclus matériaux et main d'oeuvre",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(184, 185, 210, .3)",
            borderColor: "rgb(35, 26, 136)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgb(35, 26, 136)",
            pointBackgroundColor: "rgb(255, 255, 255)",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(0, 0, 0)",
            pointHoverBorderColor: "rgba(220, 220, 220, 1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.data
        }
        ]
    })

    return (
        <div className="col p-2">
            <div className="row">
                <div className="col-md">
                    <FormGroup tag="fieldset" className="pr-2 pl-2 pb-5 pt-2" style={{border:"solid 2px #6c757d", borderRadius:"4px", boxShadow: "5px 10px #edeeee"}}>
                        <h3 className="text-center">Type</h3><br/>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" />{' '}
                                Ajout d'étage
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" />{' '}
                                Sur le côté (latéral)
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" />{' '}
                                Sur pieux
                            </Label>
                        </FormGroup>
                    </FormGroup>
                </div>
                <div className="col-md">
                    <FormGroup tag="fieldset" className="pr-2 pl-2 pb-5 pt-2" style={{border:"solid 2px #6c757d", borderRadius:"4px", boxShadow: "5px 10px #edeeee"}}>
                        <h3 className="text-center">Qualité</h3><br/>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" />{' '}
                                Standard
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" />{' '}
                                Economique
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" />{' '}
                                Haut de gamme
                            </Label>
                        </FormGroup>
                    </FormGroup>
                </div>
                <div className="col-md">
                    <div className="p-2" style={{border:"solid 2px #6c757d", borderRadius:"4px", boxShadow: "5px 10px #edeeee"}}>
                        <h3 className="text-center">Dimensions</h3><br/>
                        <FormGroup>
                            <Label for="superficie">Superficie habitable (pi2)</Label>
                            <Input type="text" name="superficie"/>
                        </FormGroup>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="col" style={{border:"solid 2px #6c757d", borderRadius:"4px", boxShadow: "5px 10px #edeeee"}}>
                        <h3 className="text-center">Coût moyen: $7500</h3>
                        <Line data={dataLine} options={{ responsive: true }} />
                    </div>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col">
                    <p className="p-3" style={{border:"solid 3px #6c757d", borderRadius:"4px", boxShadow: "5px 10px #edeeee"}}>
                        Les principaux facteurs qui peuvent influencer le prix d'un projet de rénovation de cuisine sont:
                        <ul>
                            <li>La qualité des matériaux</li>
                            <li>La superficie de la cuisine</li>
                        </ul>
                        
                        Toutefois il existe d'autres facteurs qui ne sont pas pris en compte dans notre calculateur tels que:
                        <ul>
                            <li>L'état actuel de la cuisine (pour la démolition)</li>
                            <li>Les travaux connexes à effectuer (eg: raccordement de la plomberie)</li>
                            <li>Le délai pour faire les travaux (eg: exiger que les travaux soient complétés rapidement pendant l'été peut coûter plus cher)</li>
                        </ul>

                        Note: Ce calculateur de prix inclut le prix pour fournir les matériaux ainsi que la main d'oeuvre.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col pl-5 pr-5 pb-3">
                    <Button className="col">Recevoir 3 soumissions</Button>
                </div>
            </div>
        </div>
    )
}
