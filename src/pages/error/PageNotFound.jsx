import pageNotFound from '../../assets/images/404.png'
import { Flex } from 'antd'

export default function PageNotFound(){
    return(
        <Flex vertical = { true }  align = "center" justify = "center" style={{ width: '100vw', height: 'calc(100vh - 150px)' }}>
            <img src = { pageNotFound } alt = "Erreur 401" width = { 400 } height = { 400 } />
            <p style={{ color: '#f73b73', fontWeight: 'bold', fontSize: '2rem' }}> Page non trouvée!</p>
            <p style={{ fontSize: '1.35rem'}}>La page que vous avez demandée n'existe pas!</p>
        </Flex>
    )
}