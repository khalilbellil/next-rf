import React from 'react'
import 'reactjs-popup/dist/index.css'
import GestionInscriptionsEntrepreneurs from '../../components/intranet/GestionInscriptionsEntrepreneurs'
import citiesData from '../../src/assets/json/cities-select.json';

export default function gestionInscriptionsEntrepreneurs({citiesD}) {

    return (
        <div className="pl-3 pr-3">
            <br/>
            <GestionInscriptionsEntrepreneurs citiesD={citiesD}/>
        </div>
    )
}

export async function getStaticProps() {
    const citiesD = citiesData

    return {
        props: {
            citiesD,
        },
    }
}