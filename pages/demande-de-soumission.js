import React from 'react'
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap'
import MainForm from '../components/MainForm'

export default function DemandeDeSoumission() {
    return (
        <div className="container pt-4 pb-5 rf-content">
            <h3>Remplissez ce formulaire pour qu'un entrepreneur qualifié vous appelle</h3>
            <br/>
            <MainForm/>
        </div>
    )
}
