import { useState } from "react"
import aqslogo from '../../assets/images/aqslogo.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import TextInput from "../../components/textinput/TextInput"
import axios from "../../api/axios"


export default function EmailCheking(){

    const [ messageApi, contextHolder ] = message.useMessage();

    const success = ( message ) => {
        messageApi.open({
        type: 'success',
        content: message,
        });
    };

    const error = ( message ) => {
        messageApi.open({
        type: 'error',
        content: message,
        });
    };

    const warning = ( message ) => {
        messageApi.open({
        type: 'warning',
        content: message,
        });
    };

    const [ user_email, setUser_email ] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if ( user_email.trim() == '') {
            warning('Veuillez saisir votre adresse mail!')
        }
        else{
            await axios.post('/restorepass/email/checking', { user_email })
            .then( response => {
                localStorage.setItem('user', JSON.stringify( response.data.data ))
                localStorage.setItem('action', 'restore password')
                navigate('/otpcheking')
            })
            .catch( errordata => {
                if( errordata.response.data.message ) error(( errordata.response.data.message ))
                else error( errordata.message )
            })
        }
    }

    return(
        <>
            { contextHolder }

            <div className="authentication-page">
                <div className="authentication-container">

                    <div className="logo-container">
                        <img src = { aqslogo } alt = 'Aquatic service logo' width = { 150 } height = { 80 }/>
                    </div>

                    <TextInput
                        value = { user_email }
                        setValue = { setUser_email }
                        size = 'large'
                        placeholder = 'Addresse mail'
                        type = 'email'
                    />

                    <div className="btn-container">
                        <Button type="primary" block size = 'large' onClick = { handleSubmit }> Vérifier </Button>
                    </div>

                    <div className="link-container">
                        <Link to = '/'>Se connecter</Link>
                        <Link to = '/signup'>S'inscrire</Link>
                    </div>

                </div>
            </div>
        </>
    )
}