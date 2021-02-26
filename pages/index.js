import { Col, Row } from "reactstrap";
import Link from 'next/link'
import Head from 'next/head'
import MainForm from "../components/MainForm";

export default function Home() {
  return (
        <div className="container pt-3 pb-5 rf-content">
          <Head>
            <title>RenovationFacile.fr | Trouver un entrepreneur en rénovation gratuitement</title>
          </Head>
          <main>
            <h1 className="text-center pb-2" style={{color: "#ED5B0F"}}>Trouver un entrepreneur gratuitement en 2 étapes</h1>
            <Row className="home_content text-center">
              <div className="col-md-6 home_card">
                <h2>1</h2>
                <img className="shadow-top center" src="/home_card_img_step_one.png" width="300"/>
                <p>Remplir le formulaire <Link href="/demande-de-soumission"><a>"Trouver un entrepreneur" </a></Link>
                avec les informations concernant votre projet de rénovation.</p>
              </div>
              <div className="col-md-6 home_card">
                <h2>2</h2>
                <img className="shadow-top center" src="/home_card_img_step_two.png" width="300"/>
                <p>Dans 48h à 72h, un à trois entrepreneurs vous contacteront pour vous proposer une soumission pour les travaux.</p>
              </div>
            </Row>
            <br/>
            <Row>
              <div className="col home_card">
                <h3 className="text-center">Trouver un entrepreneur</h3>
                <MainForm/>
              </div>
            </Row>
          </main>
        </div>
  )
}