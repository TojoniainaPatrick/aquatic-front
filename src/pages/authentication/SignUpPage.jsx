import { useState } from 'react'
import aqslogo from '../../assets/images/aqslogo.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import TextInput from '../../components/textinput/TextInput'
import CustomSelect from '../../components/select/CustomSelect'
import axios from '../../api/axios'
import useCustomContext from '../../context/useCustomContext'

const roles = [
    {
        value: 'approving',
        label: 'Approbateur'
    },
    {
        value: 'director',
        label: 'Réalisateur'
    },
]


export default function SignUpPage(){

    const [ messageApi, contextHolder ] = message.useMessage();

    const navigate = useNavigate();

    const {
        load,
        unload
    } = useCustomContext()

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

    const [ user_name, setUser_name ] = useState('')
    const [ user_email, setUser_email ] = useState('')
    const [ user_password, setUser_password ] = useState('')
    const [ user_role, setUser_role ] = useState('')

    const handleSubmit = async () => {
        if ( user_name.trim() == '') {
            warning('Veuillez saisir votre nom d\'utilisateur!')
        }
        else if ( user_email.trim() == '') {
            warning('Veuillez saisir votre adresse mail!')
        }
        else if ( user_password.trim() == '') {
            warning('Veuillez saisir votre mot de passe!')
        }
        else if ( user_role.trim() == '') {
            warning('Veuillez choisir le type de votre compte!')
        }
        else{

            load()

            await axios.post('/email/checking', { user_email })
            .then( response => {

                success( response.data.message )

                const register_user = { 
                    user_name,
                    user_email,
                    user_password,
                    user_role,
                    user_otp: response.data.data.user_otp
                }

                localStorage.setItem('user', JSON.stringify(register_user))
                localStorage.setItem('action', 'registration')

                navigate('/otpcheking')
            })
            .catch( errordata => {
                if( errordata.response.data.message ) error(( errordata.response.data.message ))
                else error( errordata.message )
            })
            .finally( _=> unload() )
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
                        value = { user_name }
                        setValue = { setUser_name }
                        size = 'large'
                        placeholder = "Nom d'utilisateur"
                        type = 'text'
                    />

                    <TextInput
                        value = { user_email }
                        setValue = { setUser_email }
                        size = 'large'
                        placeholder = 'Addresse mail'
                        type = 'email'
                    />

                    <PasswordInput
                        password = { user_password }
                        setPassword = { setUser_password }
                        placeholder = 'Mot de passe'
                    />

                    <CustomSelect
                        data = { roles }
                        placeholder = 'Type de compte'
                        setValue = { setUser_role }
                    />

                    <div className="btn-container">
                        <Button 
                            type="primary"
                            block
                            size = 'large'
                            onClick = { handleSubmit }
                        > S'inscrire </Button>
                    </div>

                    <div className="link-container">
                        <Link to = '/emailcheking'>Mot de passe oublié?</Link>
                        <Link to = '/'>Se connecter</Link>
                    </div>

                </div>
            </div>
        </>
    )
}