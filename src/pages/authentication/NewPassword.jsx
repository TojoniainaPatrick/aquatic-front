import { useState } from "react"
import aqslogo from '../../assets/images/aqslogo.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import PasswordInput from "../../components/passwordInput/PasswordInput"
import TextInput from "../../components/textinput/TextInput"
import axios from "../../api/axios"


export default function NewPassword(){

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

    const [ user_password, setUser_password ] = useState('')
    const [ confirm, setConfirm ] = useState('')

    const user = JSON.parse(localStorage.getItem('user')) || {}
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if ( !user_password || !confirm || user_password != confirm ) {
            warning('Veuillez verifier les mots de passe!')
        }
        else{
            await axios.put(`/user/update/${ user.user_id }`, { user_password })
            .then( response => {
                if(response.data?.data?.user_account_status?.toString().toLowerCase() == 'waiting'){
                    warning('Votre compte est en attente de validation! Veuillez patienter!')
                    navigate('/')
                }
                else if(response.data?.data?.user_account_status?.toString().toLowerCase() == 'desabled'){
                    warning('Votre compte  a été desactivé! Veuillez contacter l\'administrateur!')
                    navigate('/')
                }
                else if(response.data?.data?.user_account_status?.toString().toLowerCase() == 'rejected'){
                    warning('Votre compte  a été rejeté! Veuillez contacter l\'administrateur!')
                    navigate('/')
                }
                else {
                    navigate('/aqs/dashboadr')
                    localStorage.setItem('user', JSON.stringify( response.data.data ))
                }
            })
            .catch( errorData => {
                if( errorData.response.data.message ) error(( errorData.response.data.message ))
                else error( errorData.message )
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

                    <PasswordInput
                        password = { user_password }
                        setPassword = { setUser_password }
                        placeholder = 'Mot de passe'
                    />

                    <PasswordInput
                        password = { confirm }
                        setPassword = { setConfirm }
                        placeholder = 'Confirmation'
                    />

                    <div className="btn-container">
                        <Button type="primary" block size = 'large' onClick = { handleSubmit }> Se connecter </Button>
                    </div>

                    <div className="link-container">
                        <Link>Mot de passe oublié?</Link>
                        <Link to = '/signup'>S'inscrire</Link>
                    </div>

                </div>
            </div>
        </>
    )
}