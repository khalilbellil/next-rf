import React from 'react'
import GestionEntrepreneurs from '../../components/intranet/GestionEntrepreneurs'
import citiesData from '../../src/assets/json/cities.json';
import regionsData from '../../src/assets/json/regions.json';
import departmentsData from '../../src/assets/json/departments.json';

export default function gestionInscriptionsEntrepreneurs({citiesD, regionsD, departmentsD}) {

    return (
        <div className="pl-3 pr-3">
            <br/>
            <GestionEntrepreneurs citiesP={citiesD} regionsP={regionsD} departmentsP={departmentsD} />
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