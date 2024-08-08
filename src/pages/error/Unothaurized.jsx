import { Flex } from "antd";
import unauthorizedLogo from '../../assets/images/401.png'

export default function Unothaurized(){
    return(
        <Flex vertical = { true }  align = "center" justify = "center" style={{ width: '100vw', height: 'calc(100vh - 150px)' }}>
            <img src = { unauthorizedLogo } alt = "Erreur 401" width = { 400 } height = { 400 } />
            <p style={{ color: '#f73b73', fontWeight: 'bold', fontSize: '2rem' }}> Autorisation requise !</p>
            <p style={{ fontSize: '1.35rem'}}>Désolé, vous n'avez pas assez de privilège pour accéder à cette page!</p>
        </Flex>
    )
}