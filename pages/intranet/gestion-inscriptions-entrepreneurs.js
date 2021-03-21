import React from 'react'
import 'reactjs-popup/dist/index.css'
import GestionInscriptionsEntrepreneurs from '../../components/intranet/GestionInscriptionsEntrepreneurs'
import citiesData from '../../src/assets/json/cities.json';
import regionsData from '../../src/assets/json/regions.json';
import departmentsData from '../../src/assets/json/departments.json';

export default function gestionInscriptionsEntrepreneurs({citiesD, regionsD, departmentsD}) {

    return (
        <div className="pl-3 pr-3">
            <br/>
            <GestionInscriptionsEntrepreneurs citiesP={citiesD} regionsP={regionsD} departmentsP={departmentsD} />
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