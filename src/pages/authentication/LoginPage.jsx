import { useEffect, useState } from "react"
import aqslogo from '../../assets/images/aqslogo.jpeg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import PasswordInput from "../../components/passwordInput/PasswordInput"
import TextInput from "../../components/textinput/TextInput"
import axios from '../../api/axios'
import useCustomContext from "../../context/useCustomContext"


export default function LoginPage(){

    const [ messageApi, contextHolder ] = message.useMessage();

    const {
        setLoggedUser,
        checkTasks,
        getNotifications
    } = useCustomContext()

    useEffect( () => {
        checkTasks()
        getNotifications()
    }, [])

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
    const [ user_password, setUser_password ] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async () => {
        if ( user_email.trim() == '') {
            warning('Veuillez saisir votre adresse mail!')
        }
        else if ( user_password.trim() == '') {
            warning('Veuillez saisir votre mot de passe!')
        }
        else{
            await axios.post('/user/authenticate', { user_email, user_password })
            .then( response => {
                if(response.data?.data?.user_account_status?.toString().toLowerCase() == 'waiting') warning('Votre compte est en attente de validation! Veuillez patienter!')
                else if(response.data?.data?.user_account_status?.toString().toLowerCase() == 'desabled')warning('Votre compte  a été desactivé! Veuillez contacter l\'administrateur!')
                else if(response.data?.data?.user_account_status?.toString().toLowerCase() == 'rejected')warning('Votre compte  a été rejeté! Veuillez contacter l\'administrateur!')
                else {
                    localStorage.setItem('user', JSON.stringify(response.data.data))

                    setLoggedUser(response.data.data)
                    
                    const from =  location?.state?.from?.pathname ? location.state.from.pathname : '/aqs/dashboard'
                    navigate(from, {replace: true})
                }
            })
            .catch( errordata => {
                error( errordata?.response?.data?.message )
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

                    <PasswordInput
                        password = {user_password}
                        setPassword = { setUser_password }
                        placeholder = 'Mot de passe'
                    />

                    <div className="btn-container">
                        <Button type="primary" block size = 'large' onClick = { handleSubmit }> Se connecter </Button>
                    </div>

                    <div className="link-container">
                        <Link to = '/emailcheking'>Mot de passe oublié?</Link>
                        <Link to = '/signup'>S'inscrire</Link>
                    </div>

                </div>
            </div>
        </>
    )
}