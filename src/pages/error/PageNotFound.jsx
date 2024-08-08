import aqslogo from '../../assets/images/aqslogo.jpeg'

export default function PageNotFound(){
    return(
        <div className="page-not-found" style = {{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <img src = { aqslogo } alt="" width = { 150 } height = { 80 }/>
            <br />
            <br />
            <h1>Erreur 404</h1>
            <p>Ressource non trouvée!</p>
        </div>
    )
}